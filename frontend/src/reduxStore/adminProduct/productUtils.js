import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    productNames:[],
    product:[],
    
    status:'idle',
    error:null
}


export const findProductNames = createAsyncThunk('product/findProductNames',async(newCategory)=>{
    //  console.log('from slice', newCategory);
    try {
     const response = await axios.post('/api/products/findProductName',{
        
         ...newCategory
         },{
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
            
            },
          })
        
         return response.data
     } catch (error) {
        // console.log('err',error);
        if(error.response.data){
           return  error.response.data
        }
         return error
     }
 });
export const findProduct = createAsyncThunk('product/findProduct',async(newCategory)=>{
    try {
     const response = await axios.post('/api/products/findProductForColors',{
         ...newCategory
         },{
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
            
            },
          })
        //  console.log('response forom find product', response)
         return response.data
     } catch (error) {
        if(error.response.data){
            return  error.response.data
         }
          return error
     }
 });


 const productUtalitySlice = createSlice({
    name:'utality',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(findProductNames.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(findProductNames.fulfilled,(state,action)=>{
            state.status= 'succeeded';
            // console.log('namesssss', action.payload);
            // state.product.push(action.payload)
            state.productNames = action.payload.productNames;
            state.error = action.payload.error || action.payload.message
            // return  action.payload

        })
        .addCase(findProductNames.rejected,(state,action)=>{
            // console.log('anoth er', action );
            state.status= 'rejected';
            state.error = action.error.message

        })
        .addCase(findProduct.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(findProduct.fulfilled,(state,action)=>{
            // console.log('prodct slice',action.payload);
            state.status= 'succeeded';
            // state.product.push(action.payload)
            state.product = action.payload.product
            state.error = action.payload.error || action.payload.message
            // return  action.payload

        })
        .addCase(findProduct.rejected,(state,action)=>{
            state.status= 'rejected';
            state.error = action.error.message

        })
    }
 })


export const productNames = (state)=>state.productUtils.productNames;
export const product = (state)=>state.productUtils.product;
export const getUtalityStatus = (state)=>state.productUtils.status;
export const getUtalityError = (state)=>state.productUtils.error;


export default productUtalitySlice.reducer;