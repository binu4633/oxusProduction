import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    addedCategory:[],
    category:[],
    addedSizes:[],
    sizes:[],
    productSize:[],
    status:'idle',
    error:null
}


export const fetchCategory = createAsyncThunk('product/fetchCategory',async()=>{
    try {
         const response = await axios.get('/api/category/getcategory');
        //  console.log('fetch category responsive',response);
         return response.data
        

     } catch (error) {
        //  console.log('fetch error', error)
        //  return error.message
        return error 
     }
 })
 export const addCategory = createAsyncThunk('product/addCategory',async(newCategory)=>{
    try {
     const response = await axios.post('/api/category/category',{
         ...newCategory
         },{
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
            
            },
          })
         // console.log(response)
         return response.data
     } catch (error) {
         return error.message
     }
 });
 export const deleteCategory = createAsyncThunk('product/deleteCategory',async(id)=>{
    try {
     const response = await axios.delete(`/api/category/category/${id}`,{
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
        
        },
      })
         // console.log(response)
         return response.data
     } catch (error) {
         return error.message
     }
 });

 export const fetchSizes = createAsyncThunk('product/fetchSizes',async()=>{
    try {
         const response = await axios.get('/api/category/showSizes');
        //  console.log('fetch size response', response);
         return response.data
        //  return [...response.data,response.data.sizes.split(',')]
     } catch (error) {
         return error.message
     }
 })

 export const addSizes = createAsyncThunk('product/addSizes',async(newCategory)=>{
    try {
     const response = await axios.post('/api/category/addSizes',{
         ...newCategory
         },{
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
            
            },
          })
         // console.log(response)
         return response.data
     } catch (error) {
         return error.message
     }
 });
 export const updateSizes = createAsyncThunk('product/updateSizes',async(sizeObj)=>{
    // console.log(sizeObj);
    try {
     const response = await axios.put(`/api/category/updateSizes/${sizeObj.id}`,{
         ...sizeObj.newSize

         },{
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
            
            },
          })
         // console.log(response)
         return response.data
     } catch (error) {
         return error.message
     }
 });
 export const deleteSizes = createAsyncThunk('product/deleteSizes',async(id)=>{
    // console.log(sizeObj);
    try {
     const response = await axios.delete(`/api/category/deleteSizes/${id}`,{
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
        
        },
      })
         // console.log(response)
         return response.data
     } catch (error) {
         return error.message
     }
 });
 export const findSize = createAsyncThunk('product/findSize',async(id)=>{
    // console.log(sizeObj);
    try {
     const response = await axios.get(`/api/category/findSize/${id}`)
         // console.log(response)
         return response.data
     } catch (error) {
         return error.message
     }
 });


 const categorySlice = createSlice({
    name:'category',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCategory.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(fetchCategory.fulfilled,(state,action)=>{
            state.status= 'succeeded';
            // console.log('kjskg',action.payload);
            // state.product.push(action.payload)
            state.error = action.payload.error
            state.category= action.payload.categories;
            // return  action.payload

        })
        .addCase(fetchCategory.rejected,(state,action)=>{

            // console.log('rejected error',action.payload)
            state.status= 'rejected';
            state.error = action.error.message

        })
        .addCase(fetchSizes.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(fetchSizes.fulfilled,(state,action)=>{
            state.status= 'succeeded';
          
            state.sizes= action.payload.sizes;
            state.error = action.payload.error;
            // return  action.payload

        })
        .addCase(fetchSizes.rejected,(state,action)=>{
            state.status= 'rejected';
            state.error = action.error.message

        })
        .addCase(addCategory.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(addCategory.fulfilled,(state,action)=>{
            state.status= 'succeeded';
            // state.product.push(action.payload)
           
                state.addedCategory= action.payload.category
            
                state.error = action.payload.error
            
        
            // return  action.payload

        })
        .addCase(addCategory.rejected,(state,action)=>{
            state.status= 'rejected';
            state.error = action.error.message

        })
        .addCase(addSizes.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(addSizes.fulfilled,(state,action)=>{
            state.status= 'succeeded';
          
            state.addedSizes= action.payload.size;
            state.error = action.payload.error
            // return  action.payload

        })
        .addCase(addSizes.rejected,(state,action)=>{
            state.status= 'rejected';
            state.error = action.error.message

        })
        .addCase(findSize.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(findSize.fulfilled,(state,action)=>{
            state.status= 'succeeded';
          
            state.productSize= action.payload.size;
            state.error = action.payload.error
            // return  action.payload

        })
        .addCase(findSize.rejected,(state,action)=>{
            state.status= 'rejected';
            state.error = action.error.message

        })
    }
 })

export const category = (state)=>state.category.category;
export const sizes = (state)=>state.category.sizes;
export const addedcategory = (state)=>state.category.addedCategory;
export const addedsizes = (state)=>state.category.addedSizes;
export const productSize = (state)=>state.category.productSize;
export const getCategoryStatus = (state)=>state.category.status;
export const getCategoryError = (state)=>state.category.error;


export default categorySlice.reducer;