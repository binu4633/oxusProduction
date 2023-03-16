import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    products:[],
    totalPages:1,
    status:'idle',
    error:null,
   }

   export const fetchProducts = createAsyncThunk('product/fetchProducts',async(baseQuery)=>{
    //   console.log('color',color);
    try {
        const response = await axios.get(`/api/products/fechProducts/${baseQuery}`)
            // console.log(response)
            return response.data
    } catch (error) {
        // console.log(error.response.data);
        if(error.response.data){
            return error.response.data
        }
        return error.message
    }
});   


const fetchProductSlice = createSlice({
    name:'fetchProducts',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProducts.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.status= 'succeeded';
            // console.log('color result',action.payload);
            // state.product.push(action.payload)
            state.error = action.payload.error
            state.products= action.payload.result;
            state.totalPages = action.payload.pageCount;
            // return  action.payload

        })
        .addCase(fetchProducts.rejected,(state,action)=>{

            // console.log('rejected error',action.payload)
            state.status= 'rejected';
            state.error = action.error.message

        })
    }

})


export const getProducts = (state)=>state.productFrontend.products;
export const pageCounts = (state)=>state.productFrontend.totalPages;
export const productStatus = (state)=>state.productFrontend.status;
export const productsError = (state)=>state.productFrontend.error;



export default fetchProductSlice.reducer;
