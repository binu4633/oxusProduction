import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    products:[],
    pageCount:1,
    page:1,
    productDetail:null,
    imageCollection:null,
    status:'idle',
    error:null,
    productDetailError:null,
    imageError:null
}

export const findAdminProductCollection = createAsyncThunk('product/adminProductCollection',async(query)=>{

    
    try {
     let response;
     if(query){

         response = await axios.get(`/api/products/adminCollection/?${query}`,{
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
            
            },
          })
        }else{
         response = await axios.get(`/api/products/adminCollection`,{
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
export const findAdminProductDetail = createAsyncThunk('product/adminProductDetail',async(id)=>{

  
    try {
   

     const response = await axios.get(`/api/products/fetchProductDetail/${id}`,{
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
export const findAdminColors = createAsyncThunk('product/adminProductColorImage',async(id)=>{

  
    try {
   

     const response = await axios.get(`/api/products/fetchImages/${id}`,{
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


 const adminCollectionSlice = createSlice({
    name:'adminCollection',
    initialState,
    reducers:{
       setPage:(state,action)=>{
        const pageNum = action.payload;
        state.page = pageNum;
       }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(findAdminProductCollection.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(findAdminProductCollection.fulfilled,(state,action)=>{
            state.status= 'succeeded';
          
            // state.product.push(action.payload)
            state.products = action.payload.products;
            state.pageCount = action.payload.pageCount;
            state.error = action.payload.error || action.payload.message
            // return  action.payload

        })
        .addCase(findAdminProductCollection.rejected,(state,action)=>{
           
            state.status= 'rejected';
            state.error = action.error.message

        })
        .addCase(findAdminProductDetail.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(findAdminProductDetail.fulfilled,(state,action)=>{
            state.status= 'succeeded';
          
            state.productDetail = action.payload.result;
          
            state.productDetailError = action.payload.error || action.payload.message
            // return  action.payload

        })
        .addCase(findAdminProductDetail.rejected,(state,action)=>{
          
            state.status= 'rejected';
            state.error = action.error.message

        })
        .addCase(findAdminColors.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(findAdminColors.fulfilled,(state,action)=>{
            state.status= 'succeeded';
          
            state.imageCollection = action.payload.result;
          
            state.productDetailError = action.payload.error || action.payload.message
            // return  action.payload

        })
        .addCase(findAdminColors.rejected,(state,action)=>{
           
            state.status= 'rejected';
            state.error = action.error.message

        })

    }})



export const  {setPage} =adminCollectionSlice.actions

export const prCollection = (state)=>state.adminCollection.products;
export const getPage = (state)=>state.adminCollection.page;
export const getPageCount = (state)=>state.adminCollection.pageCount;
export const productDetail = (state)=>state.adminCollection.productDetail;
export const imageCollection = (state)=>state.adminCollection.imageCollection;
export const collectionStatus = (state)=>state.adminCollection.status;
export const colletionError = (state)=>state.adminCollection.error;
export const prDetailError = (state)=>state.adminCollection.productDetailError;
export const imageError = (state)=>state.adminCollection.imageError;


export default adminCollectionSlice.reducer;