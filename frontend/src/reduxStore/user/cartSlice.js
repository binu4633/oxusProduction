import { createSlice, current,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

let productCart;
let totalQty;
let subTotal;
if(localStorage.getItem('products')
 && localStorage.getItem('products') !='undifined'
 && localStorage.getItem('totalQty')
 && localStorage.getItem('totalQty')!='undifined'
 && localStorage.getItem('subTotal')
 && localStorage.getItem('subTotal')!='undifined'
 && localStorage.getItem('upDateTime')
 && localStorage.getItem('upDateTime')!='undifined'
 ){

  if(Date.now() - 60000 > JSON.parse(localStorage.getItem('upDateTime')) ){
    // console.log('the time expired');
    localStorage.removeItem('products');
    localStorage.removeItem('totalQty');
    localStorage.removeItem('subTotal');
    localStorage.removeItem('upDateTime');

  }else{
    // console.log('the time  not expired');
    productCart =JSON.parse(localStorage.getItem('products'));
    totalQty =JSON.parse(localStorage.getItem('totalQty'));
    subTotal =JSON.parse(localStorage.getItem('subTotal'));
  
  }

  // console.log('update time',JSON.parse(localStorage.getItem('upDateTime')) );
  // console.log('update time menus',Date.now() - 60000 );



  // console.log(productCart);
}

const initialState = {
  products: productCart || [],
  totalQty: totalQty || 0,
  subTotal: subTotal || 0,
  tax:0,
  shippingCharge:0,
  promoDiscount:false,
  promoDiscountType:null,
  promoDiscountQuntity:0,
  grandTotal:0,
  shippingChargeError:null,
  status:'idle',
  error:null
};

// export const applyPromo = createAsyncThunk('promo/applyPromo',async(promo)=>{
//   try {
//    const response = await axios.post('/api/order/applyPromo',{
//         ...promo
//        })
//        // console.log(response)
//        return response.data
//    } catch (error) {
//        return error.message
//    }
// });

export const calculateShippingCharge = createAsyncThunk('order/shippingCharge',async(shipObj)=>{
  try {
      const response = await axios.post(`/api/order/shippingCharge`,shipObj)
          // console.log('response shipping charge', response);
          return response.data
  } catch (error) {
     
      if(error.response.data){
          return error.response.data
      }
      return error.message
  }
 })


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newProduct = action.payload;
      console.log('new product', newProduct)
      const excistingProduct = state.products.find(
        (product) => product.sku === newProduct.sku
      );

      if (excistingProduct) {
        if(excistingProduct.quantity >= 10){
          return
        }
        excistingProduct.quantity++;
        excistingProduct.totalPrice =
          excistingProduct.totalPrice*1 + excistingProduct.price*1;
        state.subTotal = state.products.reduce(
          (subTot, total) => subTot*1 + total.totalPrice*1,
          0
        );
        state.totalQty++;
        state.grandTotal = state.subTotal;
      } else {
        state.products.push({
          _id: newProduct.productId,
          image: newProduct.image,
          name: newProduct.name,
          category:newProduct.category,
          price: newProduct.price - (newProduct.price * newProduct.discount/100) ,
          size:newProduct.size,
          color:newProduct.color,
          sku:newProduct.sku,
          quantity: 1,
          totalPrice: newProduct.price - (newProduct.price * newProduct.discount/100) ,
        });
        state.subTotal = state.products.reduce(
          (subTot, total) => subTot*1 + total.totalPrice*1,
          0
        );
        state.totalQty++;
        state.grandTotal = state.subTotal;
      }

      //    if(state.products.length = 0){
      //     state.subTotal =0
      //    }else{
      //     // state.subTotal =state.products.reduce((subTot,total)=>subTot+total.totalPrice,0)
      //     // console.log('hai')
      //    }
      localStorage.setItem('products',JSON.stringify(state.products));
      localStorage.setItem('totalQty',JSON.stringify(state.totalQty));
      localStorage.setItem('subTotal',JSON.stringify(state.subTotal));
      localStorage.setItem('upDateTime',JSON.stringify(Date.now()))
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      //    const {products} = state.products;

      //    console.log(current(state.products));

      let currentState = [...current(state.products)];

      let excitingProduct = currentState.find(
        (product) => product.sku === id.sku
      );
      let excitingProductIndex = currentState.findIndex(
        (product) => product.sku === id.sku
      );
      //    console.log(state.products[0])
      // console.log("id", id);
      //     console.log('index',excitingProductIndex)

      //    console.log('excistinge',excitingProduct)

      if (excitingProduct.quantity === 1) {
        // console.log('it  reche one ')
        //  console.log('current state',currentState);
        // //  const newCurrentState = [...currentState]
        // const newCurrentState =currentState.filter(product=>product._id !== id);
        // console.log( 'new current state', newCurrentState);
        //  currentState = newCurrentState;
        // console.log('current state after',currentState);
        // console.log('filtering',currentState.filter(product=>product._id !== id._id));
        // return currentState.filter(product=>product._id !== id._id);
        state.products = currentState.filter(
          (product) => product.sku !== id.sku
        );
        state.subTotal =
          state.products.reduce(
            (subTot, total) => subTot*1 - total.totalPrice*1,
            0
          ) * -1;
        state.totalQty--;
        state.grandTotal = state.subTotal;
      } else {
        // excitingProduct.quantity--
        // excitingProduct.quantity--
        // console.log('current state',currentState);
        const newExcistingProduct = { ...excitingProduct };
        newExcistingProduct.quantity--;
        newExcistingProduct.totalPrice =
          newExcistingProduct.totalPrice - newExcistingProduct.price;

        excitingProduct = newExcistingProduct;
        currentState[excitingProductIndex] = excitingProduct;
        // console.log('excistinge  after',excitingProduct);
        // console.log('curebt stae after',newExcctngpro);
        // console.log('new  current state',currentState);
        state.products = currentState;
        state.subTotal =
          state.products.reduce(
            (subTot, total) => subTot*1 - total.totalPrice*1,
            0
          ) * -1;
        state.totalQty--;
        state.grandTotal = state.subTotal;
      }

      localStorage.setItem('products',JSON.stringify(state.products));
      localStorage.setItem('totalQty',JSON.stringify(state.totalQty));
      localStorage.setItem('subTotal',JSON.stringify(state.subTotal));
      localStorage.setItem('upDateTime',JSON.stringify(Date.now()))
    },
    deleteFromCart: (state, action) => {
      const id = action.payload;
      // state.products = currentState.filter(product=>product._id !== id._id);
      const currentQty = state.products.find(
        (product) => product.sku === id.sku
      ).quantity;
    //   console.log('current qty', currentQty);

      state.products = state.products.filter(
        (product) => product.sku !== id.sku
      );
      state.subTotal =
        state.products.reduce((subTot, total) => subTot - total.totalPrice, 0) *
        -1;
      state.totalQty = state.totalQty-currentQty ;
      state.grandTotal = state.subTotal;
      localStorage.setItem('products',JSON.stringify(state.products));
      localStorage.setItem('totalQty',JSON.stringify(state.totalQty));
      localStorage.setItem('subTotal',JSON.stringify(state.subTotal));
      localStorage.setItem('upDateTime',JSON.stringify(Date.now()))
    },
    removeOutOfStock:(state, action)=>{
      const ids = action.payload;
      let currentState = [...current(state.products)];

      // console.log( 'ids', ids);
      // console.log('urrrent state', currentState);

      state.products = currentState.filter(cr=>ids.filter(i=>cr.sku === i).length === 0);
      // console.log('state products' ,state.products);

      state.totalQty = state.products.reduce((acc,total)=>acc + total.quantity*1,0);
      state.subTotal = state.products.reduce(
        (subTot, total) => subTot*1 + total.totalPrice*1,
        0
      );

       if(state.totalQty === 0){
        state.shippingCharge = 0;
       
       }

      state.grandTotal = state.subTotal + state.shippingCharge;

      localStorage.setItem('products',JSON.stringify(state.products));
      localStorage.setItem('totalQty',JSON.stringify(state.totalQty));
      localStorage.setItem('subTotal',JSON.stringify(state.subTotal));
      localStorage.setItem('upDateTime',JSON.stringify(Date.now()))

    },
    clearCart:(state,action)=>{
      state.products = [];
      state.totalQty = 0;
      state.subTotal = 0;
      state.shippingCharge = 0;
      localStorage.setItem('products',JSON.stringify(state.products));
      localStorage.setItem('totalQty',JSON.stringify(state.totalQty));
      localStorage.setItem('subTotal',JSON.stringify(state.subTotal));
    },
    findGrandTotal:(state,action)=>{
       if(state.products.length === 0){
        state.grandTotal = 0
       }else{
         if(state.promoDiscount === false){
          state.grandTotal = state.subTotal + state.tax + state.shippingCharage
         }
    
         if(state.promoDiscount === true){
          const grandTotal = state.subTotal + state.tax + state.shippingCharage;

          if(state.promoDiscountType === 'percentage'){
            state.grandTotal = grandTotal - grandTotal* state.promoDiscountQuntity/100
          }else{
            state.grandTotal = grandTotal - state.promoDiscountQuntity
          }

         }

       }

    },
    // addShippingCharge:(state,action)=>{
    //     const shippingCharge = action.payload;
    //     state.shippingCharage = shippingCharge*1;
    //     state.grandTotal = state.subTotal + shippingCharge
    //     console.log('from cart slice shipping charge', shippingCharge);
    //     console.log('from cart slice gradtotal', state.grandTotal);


       
    // }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(calculateShippingCharge.pending,(state,action)=>{
      state.status= 'loading'
  })
  .addCase(calculateShippingCharge.fulfilled,(state,action)=>{
      state.status= 'succeeded';
    //  console.log('state,shipping charge', action.payload);
      // state.product.push(action.payload)
      state.error = action.payload.error
      state.shippingCharge= action.payload.shippingCharge;
      state.grandTotal = state.subTotal + state.shippingCharge
       
      // return  action.payload

  })
  .addCase(calculateShippingCharge.rejected,(state,action)=>{

    
      state.status= 'rejected';
      state.error = action.error.message

  })
    // .addCase(applyPromo.pending,(state,action)=>{
    //     state.status= 'loading'
    // })
    // .addCase(applyPromo.fulfilled,(state,action)=>{
    //     state.status= 'succeeded';
    //     // state.product.push(action.payload)
       
        
    //     // return  action.payload

    // })
    // .addCase(applyPromo.rejected,(state,action)=>{
    //     state.status= 'rejected';
    //     state.error = action.error.message

    // })
}
});

export const { addToCart, removeFromCart, deleteFromCart ,findGrandTotal,removeOutOfStock,clearCart} = cartSlice.actions;
export const shippingStats = (state)=>state.cart.status;
export default cartSlice.reducer;



// addToCart: (state, action) => {
//   const newProduct = action.payload;

//   const excistingProduct = state.products.find(
//     (product) => product._id === newProduct._id
//   );

//   if (excistingProduct) {
//     excistingProduct.quantity++;
//     excistingProduct.totalPrice =
//       excistingProduct.totalPrice + excistingProduct.price;
//     state.subTotal = state.products.reduce(
//       (subTot, total) => subTot + total.totalPrice,
//       0
//     );
//     state.totalQty++;
//   } else {
//     state.products.push({
//       _id: newProduct._id,
//       image: newProduct.image1,
//       name: newProduct.name,
//       price: newProduct.price,
//       quantity: 1,
//       totalPrice: newProduct.price,
//     });
//     state.subTotal = state.products.reduce(
//       (subTot, total) => subTot + total.totalPrice,
//       0
//     );
//     state.totalQty++;
//   }

//   //    if(state.products.length = 0){
//   //     state.subTotal =0
//   //    }else{
//   //     // state.subTotal =state.products.reduce((subTot,total)=>subTot+total.totalPrice,0)
//   //     // console.log('hai')
//   //    }
// },



// removeFromCart: (state, action) => {
//   const id = action.payload;
//   //    const {products} = state.products;

//   //    console.log(current(state.products));

//   let currentState = [...current(state.products)];

//   let excitingProduct = currentState.find(
//     (product) => product._id === id._id
//   );
//   let excitingProductIndex = currentState.findIndex(
//     (product) => product._id === id._id
//   );
//   //    console.log(state.products[0])
//   console.log("id", id);
//   //     console.log('index',excitingProductIndex)

//   //    console.log('excistinge',excitingProduct)

//   if (excitingProduct.quantity === 1) {
//     // console.log('it  reche one ')
//     //  console.log('current state',currentState);
//     // //  const newCurrentState = [...currentState]
//     // const newCurrentState =currentState.filter(product=>product._id !== id);
//     // console.log( 'new current state', newCurrentState);
//     //  currentState = newCurrentState;
//     // console.log('current state after',currentState);
//     // console.log('filtering',currentState.filter(product=>product._id !== id._id));
//     // return currentState.filter(product=>product._id !== id._id);
//     state.products = currentState.filter(
//       (product) => product._id !== id._id
//     );
//     state.subTotal =
//       state.products.reduce(
//         (subTot, total) => subTot - total.totalPrice,
//         0
//       ) * -1;
//     state.totalQty--;
//   } else {
//     // excitingProduct.quantity--
//     // excitingProduct.quantity--
//     // console.log('current state',currentState);
//     const newExcistingProduct = { ...excitingProduct };
//     newExcistingProduct.quantity--;
//     newExcistingProduct.totalPrice =
//       newExcistingProduct.totalPrice - newExcistingProduct.price;

//     excitingProduct = newExcistingProduct;
//     currentState[excitingProductIndex] = excitingProduct;
//     // console.log('excistinge  after',excitingProduct);
//     // console.log('curebt stae after',newExcctngpro);
//     // console.log('new  current state',currentState);
//     state.products = currentState;
//     state.subTotal =
//       state.products.reduce(
//         (subTot, total) => subTot - total.totalPrice,
//         0
//       ) * -1;
//     state.totalQty--;
//   }
// },


// deleteFromCart: (state, action) => {
//   const id = action.payload;
//   // state.products = currentState.filter(product=>product._id !== id._id);
//   const currentQty = state.products.find(
//     (product) => product._id === id._id
//   ).quantity;
// //   console.log('current qty', currentQty);

//   state.products = state.products.filter(
//     (product) => product._id !== id._id
//   );
//   state.subTotal =
//     state.products.reduce((subTot, total) => subTot - total.totalPrice, 0) *
//     -1;
//   state.totalQty = state.totalQty-currentQty ;
// },