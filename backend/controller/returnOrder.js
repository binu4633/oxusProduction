import Order from "../models/orderModel.js";
import ReturnOrder from '../models/returnOrderModel.js'


const orderReturn = async(req,res)=>{
  console.log(req.body);

  try {

    const id = req.body.id;//order id
    const sku = req.body.sku;
    const order = await Order.findById(id);

    if(!order){
        return
    };

 const orderIsValid =  order.products.find(pr=>pr.sku === sku);
if(!orderIsValid){
    return
};

 const  rOrder =  await ReturnOrder.create({
         order:order._id,
         paymentIntentId:order.paymentIntentId,
         phone:order.shippingAddress.phoneNumber,
         product:order.products[0],
         shippingAddress:order.shippingAddress
       });


       console.log(rOrder);


//  console.log('order is alid', orderIsValid);

    // console.log(order);
  } catch (error) {
    console.log(error);
  }
}


export {orderReturn}