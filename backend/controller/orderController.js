import path from 'path';
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Stripe from 'stripe';
import dotenv from "dotenv";
import {sendOrderEmail} from "../utils/email.js";
// import orderEmail from "../utils/orderEmail.js";
dotenv.config();

const stripe_private = process.env.STRIP_PRIVATE_KEY;
// const domain = 'http://127.0.0.1:3000';
let domain;

if(process.env.NODE_ENV == 'development'){
  domain = process.env.DOMAIN
}else{
  domain = process.env.DOMAINPRO;
  // domain = 'http://localhost:5000';
 
}



const stripe = new Stripe(stripe_private)
const checkPin = async(req,res)=>{
    try {
        // console.log(req.body);

       const pin = req.body.pin;
       const pinString = pin.toString()

       if(pinString.length !== 6) throw new Error('invalid pin')

         if(pinString.toString().slice(0,3) === '679'){
            res.status(200).send({
                status: "success",
                result: "we have delivery on this place",
              });
         }else{
            res.status(200).send({
                status: "unsuccess",
                result: "sorry we dont  have delivery on this place",
              });
         }

      
    } catch (e) {
        res.status(500).send({
            status: "failed",
            error: e.message,
          });
    }
}

const findShippingCharge = async(req,res)=>{
    try {

        const pin = req.body.pin;
        const totalQty = req.body.totalQty;

        const pinString = pin.toString()

        if(pinString.length !== 6) throw new Error('invalid pin')

        if(pinString.slice(0,3) !== '679') throw new Error('sorry we dont  have delivery on this place, check pin number')
        
        const shippingCharge = totalQty* 10;

        res.status(200).send({
            status: "success",
            shippingCharge,
          });
        
    } catch (e) {
        res.status(500).send({
            status: "failed",
            error: e.message,
          }); 
    }
}

const takeMemberOrder = async(req,res)=>{
   
  //  console.log('the memeber order is running');
  //  console.log('user', req.user);
// console.log( 'req body', req.body);
   try {
    const user = req.user[0];
    
   const products = req.body.cartProduct;
  //  const products = req.body.products;
   const shipppingAddress = req.body.shippingAddress;
   const coupon = req.body.coupon || null
  //  console.log();
  //  console.log('shipping address', shipppingAddress);
  //  console.log('productsss', products);
//    console.log('address', shipppingAddress);

   // checking pin is right
//    console.log('typeof pin', typeof(shipppingAddress.pinCode));
   const pinString = shipppingAddress.pinCode.toString();
   if(pinString.length !== 6) throw new Error('invalid pin')
   if(pinString.toString().slice(0,3) !== '679')throw new Error("sorry we dont  have delivery on this place")
   // product check, enough num available
   
   const  productOutofStockPromise = products.map(async(pr)=>{
      const orderedProduct = await Product.findById(pr._id);
      const skuAr =   orderedProduct.sku.find(sk=>sk.sku === pr.sku);
      if(skuAr.qty < pr.quantity){
        return pr
      }
      return 

   })

  

   const productOutofStock = await (await Promise.all(productOutofStockPromise)).filter(st=>st !== undefined);

   if(productOutofStock.length>0){
    // console.log('product out of stock is there');
    res.send({
        status:'out of stock',
        outOfStock:productOutofStock
    });

    return
   }
   let couponInValid ;
   let couponDetail;
   if(coupon){
    await stripe.coupons.retrieve(coupon)
    .then((cop)=>{
      // console.log('coupon', cop);
      couponDetail = cop;
      couponInValid = false
    }).catch((err)=>{
      // console.log(err);
      couponInValid = true
    });
   }

   if(couponInValid){
    res.send({
      status:'coupon invalid',
      couponInValid:`coupon code ${coupon} is invalid `
  });
  return
   }


const billingProductsPromise =  products.map(async(pr)=>{
  const orderedProduct = await Product.findById(pr._id);
  const productSku = orderedProduct.sku.find(sk=>sk.sku == pr.sku);

  const order = {
    _id:orderedProduct._id,
    name:orderedProduct.name,
    category:orderedProduct.category,
    size:productSku.size,
    color:productSku.color,
    coverImage:orderedProduct.colors,
    sku:pr.sku,
    quantity:pr.quantity,
    price:orderedProduct.price,
    discount:orderedProduct.discount,
    // totalPrice:this.price*1 * this.quantity*1
  }
 
  return order;
})

// const billingProducts = await Promise.all(billingProductsPromise)
const billingProducts = await (await Promise.all(billingProductsPromise)).map(pr=>{
  return {...pr,totalPrice:(pr.price *1-(pr.price*pr.discount/100)) * pr.quantity*1,
  images:pr.coverImage.find(cr=>cr.color === pr.color).coverImage.image
}
});

const totalQty = billingProducts.reduce((sum,cr)=>sum+cr.quantity,0)
const billingCartProduct = billingProducts.map(pr=>{
  return {
    _id:pr._id,
    sku:pr.sku,
    quantity:pr.quantity
  }
})
// console.log('billing products', billingProducts);

if(coupon && couponDetail){
  // console.log('coupon detail', couponDetail);
  if(couponDetail.amount_off){
    const grandTotal = billingProducts.reduce((sum,cr)=>sum+cr.totalPrice*1,0);
    const amountOff = couponDetail.amount_off/100;
    // console.log('grand total', grandTotal);
    // console.log('amount off', amountOff);
    if(grandTotal/2 <= amountOff){
      res.send({
        status:'coupon invalid',
         couponInValid:`minimum total amount ${amountOff *2} is required for this coupon`
    });
    return
    }
  }
}

  //  console.log( 'out of stock', productOutofStock);
  const customer = await stripe.customers.create({
    metadata:{
      userId: JSON.stringify(user._id),
      cart:JSON.stringify(billingCartProduct),
      shippingAddress:JSON.stringify(shipppingAddress)
    }
  })
let session
if(coupon){
  session = await stripe.checkout.sessions.create({
    //for testing pouprose  thise thing is removed for 
    // payment_method_types:['card','paynow'],
    //  custom_text:{
    //   shippingAddress:shipppingAddress.address
    //  },
     customer:customer.id,
    //  customer_update:{
    //   address:shipppingAddress.address
    //  },
    // metadata:{
    //   order_id:1234567
    // },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {amount: `${totalQty*10*100}`, currency: 'INR'},
          display_name: 'shipping time',
          delivery_estimate: {
            minimum: {unit: 'business_day', value: 5},
            maximum: {unit: 'business_day', value: 7},
          },
        },
      },
    ],
    line_items: billingProducts.map(pr=>{
        return {
            price_data:{
                currency:'INR',
                product_data:{
                    // category:pr.category,
                    name:`${pr.category}/${pr.name}/${pr.size}/${pr.color}`,
                    images:[pr.images],
                    // size:pr.size,
                    // color:pr.color,

                },
                
                
                unit_amount:(pr.price - (pr.price * pr.discount/100))*100
            },
            
            quantity:pr.quantity
        }
    })
  ,
    mode: 'payment',
    // discounts:[{
    //   promotion_code:"S5VHVXVX"
    // }],
    discounts:[{
      coupon:coupon 
    }] ,
    // success_url: `${domain}/order/payment/success`,
    // cancel_url: `${domain}/order/payment/failed`,             
    // success_url: `${domain}/order/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    success_url: `${domain}/order/payment/success`,
    // cancel_url: `${domain}/order/payment/failed`,      
    cancel_url: `${domain}`,      
    // shipping_address_collection:{allowed_countries:['IN']}       
   })
}else{
  session = await stripe.checkout.sessions.create({
    payment_method_types:['card'],
    //  custom_text:{
    //   shippingAddress:shipppingAddress.address
    //  },
     customer:customer.id,
    //  customer_update:{
    //   address:shipppingAddress.address
    //  },
    // metadata:{
    //   order_id:1234567
    // },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {amount: `${totalQty*10*100}`, currency: 'INR'},
          display_name: 'shipping time',
          delivery_estimate: {
            minimum: {unit: 'business_day', value: 5},
            maximum: {unit: 'business_day', value: 7},
          },
        },
      },
    ],
    line_items: billingProducts.map(pr=>{
        return {
            price_data:{
                currency:'INR',
                product_data:{
                    // category:pr.category,
                    name:`${pr.category}/${pr.name}/${pr.size}/${pr.color}`,
                    images:[pr.images],
                    // size:pr.size,
                    // color:pr.color,

                },
                
                
                unit_amount:(pr.price - (pr.price * pr.discount/100))*100
            },
            
            quantity:pr.quantity
        }
    })
  ,
    mode: 'payment',
    
    success_url: `${domain}/order/payment/success`,
    // cancel_url: `${domain}/order/payment/failed`,      
    cancel_url: `${domain}`,      
    // shipping_address_collection:{allowed_countries:['IN']}       
   })
}

  


res.status(200).json({sessionId:session.id})

   
  //  res.send(`payment is accepted as ${user.name}`)
   } catch (error) {
    // console.log('errror',error);
    res.status(400).send({error:"error, unable to do payment"})
   }
}
const takeGuestOrder = async(req,res)=>{
  try {
   
    // console.log('the guest route is running');
    // console.log('domain',domain);
   const products = req.body.cartProduct;
  //  const products = req.body.products;
   const shipppingAddress = req.body.shippingAddress;
   const coupon = req.body.coupon || null
  //  console.log();

   const pinString = shipppingAddress.pinCode.toString();
   if(pinString.length !== 6) throw new Error('invalid pin')
   if(pinString.toString().slice(0,3) !== '679')throw new Error("sorry we dont  have delivery on this place")
   // product check, enough num available
   
   const  productOutofStockPromise = products.map(async(pr)=>{
      const orderedProduct = await Product.findById(pr._id);
      const skuAr =   orderedProduct.sku.find(sk=>sk.sku === pr.sku);
      if(skuAr.qty < pr.quantity){
        return pr
      }
      return 

   })

  

   const productOutofStock = await (await Promise.all(productOutofStockPromise)).filter(st=>st !== undefined);

   if(productOutofStock.length>0){
    // console.log('product out of stock is there');
    res.send({
        status:'out of stock',
        outOfStock:productOutofStock
    });

    return
   }
   let couponInValid ;
   let couponDetail;
   if(coupon){
    await stripe.coupons.retrieve(coupon)
    .then((cop)=>{
      // console.log('coupon', cop);
      couponDetail = cop;
      couponInValid = false
    }).catch((err)=>{
      // console.log(err);
      couponInValid = true
    });
   }

   if(couponInValid){
    res.send({
      status:'coupon invalid',
      couponInValid:`coupon code ${coupon} is invalid `
  });
  return
   }


const billingProductsPromise =  products.map(async(pr)=>{
  const orderedProduct = await Product.findById(pr._id);
  const productSku = orderedProduct.sku.find(sk=>sk.sku == pr.sku);

  const order = {
    _id:orderedProduct._id,
    name:orderedProduct.name,
    category:orderedProduct.category,
    size:productSku.size,
    color:productSku.color,
    coverImage:orderedProduct.colors,
    sku:pr.sku,
    quantity:pr.quantity,
    price:orderedProduct.price,
    discount:orderedProduct.discount,
    // totalPrice:this.price*1 * this.quantity*1
  }
 
  return order;
})

// const billingProducts = await Promise.all(billingProductsPromise)
const billingProducts = await (await Promise.all(billingProductsPromise)).map(pr=>{
  return {...pr,totalPrice:(pr.price *1-(pr.price*pr.discount/100)) * pr.quantity*1,
  images:pr.coverImage.find(cr=>cr.color === pr.color).coverImage.image
}
});

const totalQty = billingProducts.reduce((sum,cr)=>sum+cr.quantity,0)
const billingCartProduct = billingProducts.map(pr=>{
  return {
    _id:pr._id,
    sku:pr.sku,
    quantity:pr.quantity
  }
})
// console.log('billing products', billingProducts);

if(coupon && couponDetail){
  // console.log('coupon detail', couponDetail);
  if(couponDetail.amount_off){
    const grandTotal = billingProducts.reduce((sum,cr)=>sum+cr.totalPrice*1,0);
    const amountOff = couponDetail.amount_off/100;
    // console.log('grand total', grandTotal);
    // console.log('amount off', amountOff);
    if(grandTotal/2 <= amountOff){
      res.send({
        status:'coupon invalid',
         couponInValid:`minimum total amount ${amountOff *2} is required for this coupon`
    });
    return
    }
  }
}

  //  console.log( 'out of stock', productOutofStock);
  const customer = await stripe.customers.create({
    metadata:{
      user:JSON.stringify('guest'),
      cart:JSON.stringify(billingCartProduct),
      shippingAddress:JSON.stringify(shipppingAddress)
    }
  })
let session
if(coupon){
  session = await stripe.checkout.sessions.create({
    payment_method_types:['card'],
    //  custom_text:{
    //   shippingAddress:shipppingAddress.address
    //  },
     customer:customer.id,
    //  customer_update:{
    //   address:shipppingAddress.address
    //  },
    // metadata:{
    //   order_id:1234567
    // },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {amount: `${totalQty*10*100}`, currency: 'INR'},
          display_name: 'shipping time',
          delivery_estimate: {
            minimum: {unit: 'business_day', value: 5},
            maximum: {unit: 'business_day', value: 7},
          },
        },
      },
    ],
    line_items: billingProducts.map(pr=>{
        return {
            price_data:{
                currency:'INR',
                product_data:{
                    // category:pr.category,
                    name:`${pr.category}/${pr.name}/${pr.size}/${pr.color}`,
                    images:[pr.images],
                    // size:pr.size,
                    // color:pr.color,

                },
                
                
                unit_amount:(pr.price - (pr.price * pr.discount/100))*100
            },
            
            quantity:pr.quantity
        }
    })
  ,
    mode: 'payment',
    // discounts:[{
    //   promotion_code:"S5VHVXVX"
    // }],
    discounts:[{
      coupon:coupon 
    }] ,
    // success_url: `${domain}/order/payment/success`,
    // cancel_url: `${domain}/order/payment/failed`,             
    // success_url: `${domain}/order/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    success_url: `${domain}/order/payment/success`,
    // cancel_url: `${domain}/order/payment/failed`,      
    cancel_url: `${domain}`,      
    // shipping_address_collection:{allowed_countries:['IN']}       
   })
}else{
  session = await stripe.checkout.sessions.create({
    ///////////////////////////////////////
    // payment_method_types:['card'],
    //  custom_text:{
    //   shippingAddress:shipppingAddress.address
    //  },
     customer:customer.id,
    //  customer_update:{
    //   address:shipppingAddress.address
    //  },
    // metadata:{
    //   order_id:1234567
    // },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {amount: `${totalQty*10*100}`, currency: 'INR'},
          display_name: 'shipping time',
          delivery_estimate: {
            minimum: {unit: 'business_day', value: 5},
            maximum: {unit: 'business_day', value: 7},
          },
        },
      },
    ],
    line_items: billingProducts.map(pr=>{
        return {
            price_data:{
                currency:'INR',
                product_data:{
                    // category:pr.category,
                    name:`${pr.category}/${pr.name}/${pr.size}/${pr.color}`,
                    images:[pr.images],
                    // size:pr.size,
                    // color:pr.color,

                },
                
                
                unit_amount:(pr.price - (pr.price * pr.discount/100))*100
            },
            
            quantity:pr.quantity
        }
    })
  ,
    mode: 'payment',
    
    success_url: `${domain}/order/payment/success`,
    // cancel_url: `${domain}/order/payment/failed`,      
    cancel_url: `${domain}`,      
    // shipping_address_collection:{allowed_countries:['IN']}       
   })
}

  


res.status(200).json({sessionId:session.id})

   
  //  res.send(`payment is accepted as ${user.name}`)
   } catch (error) {
    // console.log('errror',error);
    res.status(400).send({error:"error, unable to do payment"})
   }
}



const createOrder = async(customer,data)=>{
   const cartItems = JSON.parse(customer.metadata.cart);
   const shipppingAddress = JSON.parse(customer.metadata.shippingAddress);

    //  console.log('cart item', cartItems);
    // console.log('the user', customer.metadata );
    // console.log('the user parse', JSON.parse(customer.metadata.user) );
    // console.log('the user', customer.metadata.user ? JSON.parse(customer.metadata.user) : null);
   const userId = customer.metadata.userId ? JSON.parse(customer.metadata.userId) : null;
   const guest = customer.metadata.user ? JSON.parse(customer.metadata.user) : null;
   
   const discount = Number(data.total_details.amount_discount)/100 || 0
   const subTotal = Number(data.amount_subtotal)/100;
   const total = Number(data.amount_total)/100;
   const customerId = data.customer;
   const paymentIntentId = data.payment_intent;
   const shippingCost =  Number(data.shipping_cost.amount_subtotal)/100;
   const paymentStatus = data.payment_status;

   const billingProductsPromise =  cartItems.map(async(pr)=>{
    const orderedProduct = await Product.findById(pr._id);
    const productSku = orderedProduct.sku.find(sk=>sk.sku == pr.sku);
  
    const order = {
      _id:orderedProduct._id,
      name:orderedProduct.name,
      category:orderedProduct.category,
      size:productSku.size,
      color:productSku.color,
      sku:pr.sku,
      quantity:pr.quantity,
      price:orderedProduct.price,
      image:orderedProduct.colors.find(cr=>cr.color=== productSku.color).coverImage.image,
      discount:orderedProduct.discount
      // totalPrice:this.price*1 * this.quantity*1
    }
   
    return order;
  })
  
  // const billingProducts = await Promise.all(billingProductsPromise)
  const billingProducts = await (await Promise.all(billingProductsPromise)).map(pr=>{
    return {...pr,totalPrice:((pr.price *1)-(pr.price*pr.discount/100)) * pr.quantity*1,discountedPrice:(pr.price *1)-(pr.price*pr.discount/100)}
  });

   try {
  const savedOrder =   await Order.create({
      customerId:customerId,
      paymentIntentId:paymentIntentId,
      products:billingProducts,
      shippingAddress:shipppingAddress,
      subTotal:subTotal,
      shipping_cost:shippingCost,
      discount,
      total:total,
      guest: guest ? true :false,
      member : userId? userId :null,
      payment_status:paymentStatus
    })
  //  console.log(savedOrder);
    if(userId){
      const user = await User.findById(userId);
      user.orders.unshift({
        order:savedOrder._id,
        date:Date.now()
      });
      user.save();
    }
  const cartitemPromise =   cartItems.map(async(cr)=>{
    const product = await Product.findById(cr._id);
   const skuIndex = product.sku.findIndex(pr=>pr.sku == cr.sku);
   product.sku[skuIndex].qty = product.sku[skuIndex].qty - cr.quantity*1;
   product.productStockCount =  product.productStockCount - cr.quantity*1; 
   product.totalSale =  product.totalSale + cr.quantity*1; 
   await product.save()
  })
   const savedProduct = await Promise.all(cartitemPromise)
  
  //  console.log(savedOrder);
  //  console.log(cartItems);

  const mailOptions = {
    email:shipppingAddress.email,
    subject:"order confirm mail",
    message:'order confirmed by oxus team',
    order:savedOrder
  }

  await sendOrderEmail(mailOptions)
  .then(()=>console.log('mail send sucuessfully'))
  .catch((err)=>console.log(err))
  //  console.log(savedProduct);
   } catch (error) {
      // console.log(error);
   }

}


const webHooks =   async (req,res)=>{
  // console.log('hooksssss');

  // let signingSecret = 'whsec_a06ba433b8d023ab141934b919e0064c565c16bcb60c32ccf9c0434ab1d2587f';
  let signingSecret = 'whsec_toeLh3uyyzmf4WGJkrRVH7fpHVmIIjLU';
                      //  whsec_a06ba433b8d023ab141934b919e0064c565c16bcb60c32ccf9c0434ab1d2587f
                      // whsec_W6EcZaL1eRDXOFt0d7PZ3aV64adlnrLY
  const payLoad = req.body;

  // console.log('payload', payLoad);
  const sig = req.headers['stripe-signature'];

  // console.log('sig', sig);


  let event;

   try {
      event = stripe.webhooks.constructEvent(payLoad,sig,signingSecret);
      // console.log('webhook sucessss');
    // console.log('event', event);
    const data = event.data.object;
    const eventType = event.type;

    // console.log('data', data);
    // console.log('event type', eventType);

    if(eventType === "checkout.session.completed"){
      //  console.log('the checkout is sucesss');
      stripe.customers.retrieve(data.customer)
      .then(customer=>{
        // console.log('customer', customer);
        createOrder(customer,data)
      }).catch(err=>{
        // console.log(err.message)
      })
    }
    res.status(200).send().end()   
   } catch (error) {
      //  console.log('webhook failed');
      // console.log(error.message);

      res.status(400).json({success:false});

      return
      
   }

  // //  console.log(event.type);
  //  console.log('event data object',event.data.object.product_data);
  // //  console.log(event.data.object.id);
  //  res.status(200).json({success:true});

}



const getOrderDetail = async(req,res)=>{
  // res.send(req.params.id)

  try {
      if(!req.params.id) throw new Error('eroor please try later');

      const order = await Order.findById(req.params.id).select('-paymentIntentId -cutsomerId -guest -member');
      
      // const newOrder =  await order.select('-paymentIntentId -cutsomerId -guest -member')
      res.send({
          status:'success',
          // order:newOrder
          order
      })
  } catch (error) {
      //  console.log(error);
      res.send({
          status:'failed',
          error
      })
  }

}

const createCoupon = async(req,res)=>{
  //  console.log('coupon route running');
  try {
    const coupon = await stripe.coupons.create({

      currency:'INR',
      // duration:"repeating",
      // duration_in_months:1,
      // max_redemptions:null,
      name:'15% off',
      percent_off:15,
      redeem_by:1674808092
      
    })
    // console.log(coupon);
      res.send(coupon)
  } catch (error) {
    // console.log(error);
    res.send(error)
  
  }

}

const createPromoCode = async(req,res)=>{
  // res.send('the promo is created')
  try {
    const promo = await stripe.promotionCodes.create({
      // code:'promo123',
      coupon:'BpRz9M4V',
      max_redemptions:10,
      restrictions:{
        minimum_amount:1000,
        minimum_amount_currency:'INR'
      }
  
    })
    res.send(promo)
  } catch (error) {
     res.send(error)
  }
}

const orderTest = async(req,res)=>{
  // console.log('test order');
  // console.log(req.body);

  // const coupon = await stripe.coupons.retrieve(
  //   'Z4OV52SU'
  // );
try {

  const mailOptions = {
    email:"binu4633@gmail.com",
    subject:"conform order email",
    html:orderEmail('this content comming as parameter')
    // html:options.html,
 }   
// const orederMail =  await sendMail(mailOptions)
const orederMail =  await sendMail(req.body)
// const orederMail =  await sendMail({
//   from:'oxus collections<oxus.io>',
//   to:'binu@gmail.com',
//   subject:'the html test',
//   text:'threre is a test text',
//   // html:orderEmail
// })

  // console.log(orederMail);
  res.send(orederMail)
  // const coupon= await stripe.coupons.retrieve(
//  await stripe.coupons.retrieve(
//     'BpRz9M4V'
//   ).then((cop)=>{
//     console.log('coupon', cop);
//   }).catch((err)=>{
//     console.log(err);
//   });
//   let result;
// new Promise stripe.coupons.retrieve(
//     'BpRz9M4V'
//   )

// const couponPromise = new Promise((resolve,reject)=>{
// stripe.coupons.retrieve(
//     'BpRz9M4V'
//   )

// })

// couponPromise.then((coup)=>{
//   res.send(coup)
// }).catch((err)=>{
//   res.send(err)
// })

  // res.send(coupon)
// const cart = req.body;


//  const cartitemPromise =   cart.map(async(cr)=>{
//     const product = await Product.findById(cr.id);
//     // return product
//    const skuIndex = product.sku.findIndex(pr=>pr.sku == cr.sku);
//    product.sku[skuIndex].qty = product.sku[skuIndex].qty - cr.quantity*1;
//    await product.save()
//   return product
  // const updateProduct = await Product.findByIdAndUpdate(cr.id,(err,data)=>{
  //   if(err){
  //     console.log(err);
  //   }
  //   if(data){
  //   const skuIndex = data.sku.findIndex(pr=>pr.sku == cr.sku);
  //  data.sku[skuIndex].qty= data.sku[skuIndex].qty - cr.quantity*1;
  //   }
  // })

  // })
  //  const savedProduct = await Promise.all(cartitemPromise);




  //  const reducedProductPromise = cart.map(async(cr)=>{
  //     const cartedProduct = savedProduct.find(pr=>pr._id === cr.id);

  //  })

  //  console.log(savedProduct);

  // res.send(savedProduct)
} catch (error) {
  // console.log(error);
  res.send(error)
}

}
export {checkPin,findShippingCharge,takeGuestOrder,takeMemberOrder,webHooks,getOrderDetail,createPromoCode,createCoupon,orderTest}


//  const session = await stripe.checkout.sessions.create({
  //   payment_method_types:['card'],
  //   line_items:products.map(pr=>{
  //       return {
  //           price_data:{
  //               currency:'INR',
  //               product_data:{
  //                   // category:pr.category,
  //                   name:pr.name,
  //                   // size:pr.size,
  //                   // color:pr.color,

  //               },
  //               unit_amount:pr.price
  //           },
  //           quantity:pr.quantity
  //       }
  //   }),
  //   mode: 'payment',
  //   // success_url: `${domain}/order/payment/success`,
  //   // cancel_url: `${domain}/order/payment/failed`,             
  //   // success_url: `${domain}/order/payment/success?session_id={CHECKOUT_SESSION_ID}`,
  //   success_url: `${domain}/order/payment/success`,
  //   // cancel_url: `${domain}/order/payment/failed`,      
  //   cancel_url: `${domain}`,      
  //   // shipping_address_collection:{allowed_countries:['IN']}       
  //  })

//    res.json({url:session.url})  
// res.status(200).json({sessionId:session.id})