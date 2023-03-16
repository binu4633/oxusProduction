import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    profile:null,
    order:null,
    resetResult:null,
    status:'idle',
    error:null,
    resetError:null,
    orderError:null
   }



 export const findProfile = createAsyncThunk('user/findProfile',async(newUser)=>{
    try {
     const response = await axios.get('/api/user/profile',{
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
        
        },
      })
    //    console.log(response);
         return response.data
     } catch (error) {
       
        if(error.response.data){
            return error.response.data
        }else{
            return error.message
        }
         
     }
 })
 export const resetPassword = createAsyncThunk('user/resetPassword',async(newPassword)=>{
    try {
     const response = await axios.patch('/api/user/resetPassword',{...newPassword},{
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
        
        },
      },)
    //    console.log(response);
         return response.data
     } catch (error) {
       
        if(error.response.data){
            return error.response.data
        }else{
            return error.message
        }
         
     }
 })
 export const profileUpdate = createAsyncThunk('user/profileUpdate',async(update)=>{
    try {
     const response = await axios.patch('/api/user/updateProfile',{...update},{
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
        
        },
      },)
    //    console.log(response);
         return response.data
     } catch (error) {
       
        if(error.response.data){
            return error.response.data
        }else{
            return error.message
        }
         
     }
 })

 export const findOrderDetail = createAsyncThunk('user/findOrderDetail',async(id)=>{
    try {
     const response = await axios.get(`/api/order/orderDetail/${id}`,{
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
        
        },
      })
    //    console.log(response);
         return response.data
     } catch (error) {
       
        if(error.response.data){
            return error.response.data
        }else{
            return error.message
        }
         
     }
 })


const profileSlice = createSlice({
    name: 'profile',
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(findProfile.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(findProfile.fulfilled,(state,action)=>{
            state.status= 'succeeded';
            // console.log(action.payload);
           
            state.profile= action.payload.profile;
           })
        .addCase(findProfile.rejected,(state,action)=>{
            state.status= 'rejected';
            state.error = action.error.message
        })
        .addCase(findOrderDetail.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(findOrderDetail.fulfilled,(state,action)=>{
            state.status= 'succeeded';
            // console.log(action.payload);
           
            state.order= action.payload.order;
           })
        .addCase(findOrderDetail.rejected,(state,action)=>{
            state.status= 'rejected';
            state.orderError = action.error.message
        })
        .addCase(resetPassword.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(resetPassword.fulfilled,(state,action)=>{
            state.status= 'succeeded';
            // console.log(action.payload);
           
            state.resetResult= action.payload.result;
           })
        .addCase(resetPassword.rejected,(state,action)=>{
            state.status= 'rejected';
            state.error = action.error.message
        })
    }
}) 


export const getProfile = (state)=>state.profile.profile;
export const getOrder = (state)=>state.profile.order;
export const resetResult = (state)=>state.profile.resetResult;
export const profileStatus = (state)=>state.profile.status;
export const profileError = (state)=>state.profile.error;
export const resetError = (state)=>state.profile.resetError;
export const orderError = (state)=>state.profile.orderError;


export default profileSlice.reducer;