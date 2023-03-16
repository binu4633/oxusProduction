import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    orders:[],
    orderDetail:null,
    pageCount:1,
    status:'idle',
    error:null
}

export const findOrders = createAsyncThunk('orders/findOrders',async(query)=>{


    try {
        let response 
          if(query){
            response = await axios.get(`/api/orderAdmin/orders/${query}`,{
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
                
                },
              })
          }else{

              response = await axios.get('/api/orderAdmin/orders',{
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
                
                },
              })
          }
        
         return response.data
     } catch (error) {
     
        if(error.response.data){
           return  error.response.data
        }
         return error
     }
 });
export const findOrderDetail = createAsyncThunk('orders/findOrderDetail',async(id)=>{


    try {
     const response = await axios.get(`/api/orderAdmin/orderDetail/${id}`,{
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
        
        },
      })
       
         return response.data
     } catch (error) {
      
        if(error.response.data){
           return  error.response.data
        }
         return error
     }
 });


 const ordersSlice = createSlice({
    name:'order',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(findOrders.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(findOrders.fulfilled,(state,action)=>{
            state.status= 'succeeded';
           
            // state.product.push(action.payload)
            state.orders = action.payload.orders;
            state.pageCount = action.payload.pages;
            state.error = action.payload.error || action.payload.message
            // return  action.payload

        })
        .addCase(findOrders.rejected,(state,action)=>{
         
            state.status= 'rejected';
            state.error = action.error.message

        })
        .addCase(findOrderDetail.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(findOrderDetail.fulfilled,(state,action)=>{
            state.status= 'succeeded';
       
            // state.product.push(action.payload)
            state.orderDetail = action.payload.order;
            state.error = action.payload.error || action.payload.message
            // return  action.payload

        })
        .addCase(findOrderDetail.rejected,(state,action)=>{
        
            state.status= 'rejected';
            state.error = action.error.message

        })

    }})




export const getOrders = (state)=>state.order.orders;
export const getPageCount = (state)=>state.order.pageCount;
export const getOrderDetail =(state)=>state.order.orderDetail;
export const orderStatus = (state)=>state.order.status;
export const orderError = (state)=>state.order.error;


export default ordersSlice.reducer;