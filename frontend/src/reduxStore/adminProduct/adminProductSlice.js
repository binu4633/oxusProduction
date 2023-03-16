import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    product:null,
    status:'idle',
    error:null
}


export const addProduct = createAsyncThunk('product/addPro',async(newProduct)=>{
    try {
     const response = await axios.post('/api/products/addProduct',{
         ...newProduct
         },{
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
            
            },
          })
         // console.log(response)
         return response.data
     } catch (error) {

        if(error.response.data){
            return error.response.data
        }
         return error.message
     }
 });


 const adminProductSlice = createSlice({
    name:'adminProduct',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addProduct.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(addProduct.fulfilled,(state,action)=>{
            state.status= 'succeeded';
            // console.log('namesssss', action.payload);
            // state.product.push(action.payload)
            state.product = action.payload.product;
            state.error = action.payload.error || action.payload.message
            // return  action.payload

        })
        .addCase(addProduct.rejected,(state,action)=>{
            // console.log('anoth er', action );
            state.status= 'rejected';
            state.error = action.error.message

        })
    }
 })



export const addedProduct = (state)=>state.adminAddedProduct.product;
export const getAddedProductStatus = (state)=>state.adminAddedProduct.status;
export const getAddedProductError = (state)=>state.adminAddedProduct.error;


export default adminProductSlice.reducer;



 