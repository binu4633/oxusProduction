import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    outOfStock:null,
    couponInvalid:null,
    coupon:null,
    // url:null,
    sessionId:null,
    status:'idle',
    error:null,
   }


export const memberPayment = createAsyncThunk( "order/memberPayment",
  async (order) => {
    console.log('order inslice', order);
    // console.log('token',JSON.parse(localStorage.getItem("userInfo")).token );
    try {
      const response = await axios.post(`/api/order/memeberOrder`,order,{
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
        
        },
      });
      // console.log('payment response', response);
      return response.data;
    } catch (error) {
        // console.log('payment error', error);
      if (error.response.data) {
        return error.response.data;
      }
      return error.message;
    }
  }
);
export const guestPayment = createAsyncThunk( "order/guestPayment",
  async (order) => {
   
    try {
      const response = await axios.post(`/api/order/guestOrder`,order);
      // console.log('payment response', response);
      return response.data;
    } catch (error) {
        // console.log('payment error', error);
      if (error.response.data) {
        return error.response.data;
      }
      return error.message;
    }
  }
);


const paymentSlice = createSlice({
    name:'payment',
    initialState,
    reducers:{
        removeFromOutOfStock:(state,action)=>{
          state.outOfStock = null 
        },
        removeCouponInvalid:(state,action)=>{
          state.couponInvalid = null
        },
        addCoupon:(state,action)=>{
          state.coupon = action.payload
        },
        removeCoupon:(state,action)=>{
          state.coupon = null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(memberPayment.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(memberPayment.fulfilled,(state,action)=>{
            // console.log('action payload');
            state.status= 'succeeded';
            state.error = action.payload.error
            state.outOfStock= action.payload.outOfStock;
            state.couponInvalid = action.payload.couponInValid;
            // state.url = action.payload.url
            state.sessionId = action.payload.sessionId;
         

        })
        .addCase(memberPayment.rejected,(state,action)=>{
            state.status= 'rejected';
            state.error = action.error.message

        })
        .addCase(guestPayment.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(guestPayment.fulfilled,(state,action)=>{
            // console.log('action payload');
            state.status= 'succeeded';
            state.error = action.payload.error
            state.outOfStock= action.payload.outOfStock;
            state.couponInvalid = action.payload.couponInValid;
            // state.url = action.payload.url
            state.sessionId = action.payload.sessionId;
         

        })
        .addCase(guestPayment.rejected,(state,action)=>{
            state.status= 'rejected';
            state.error = action.error.message

        })
    }

})

export const {removeFromOutOfStock,removeCouponInvalid,addCoupon,removeCoupon} = paymentSlice.actions;

export const getProductOutOfStock = (state)=>state.payment.outOfStock;
export const couponInvalid = (state)=>state.payment.couponInvalid;
export const enteredCoupon = (state)=>state.payment.coupon;

// export const getUrl = (state)=>state.payment.url;
export const getSessionId = (state)=>state.payment.sessionId;
export const paymentStatss = (state)=>state.payment.status;
export const paymentError = (state)=>state.payment.error;



export default paymentSlice.reducer;