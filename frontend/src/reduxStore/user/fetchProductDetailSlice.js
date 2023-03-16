import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    productDetail:[],
    status:'idle',
    error:null,
   }

   export const fetchProductDetail = createAsyncThunk('product/fetchProductDetail',async(id)=>{
    //   console.log('color',color);
    try {
        const response = await axios.get(`/api/products/fetchProductDetail/${id}`)
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


const fetchProductDetailSlice = createSlice({
    name:'fetchProductDetail',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProductDetail.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(fetchProductDetail.fulfilled,(state,action)=>{
            state.status= 'succeeded';
            // console.log('detail ',action.payload);
            // state.product.push(action.payload)
            state.error = action.payload.error
            state.productDetail= action.payload.result;
            // return  action.payload

        })
        .addCase(fetchProductDetail.rejected,(state,action)=>{

            // console.log('rejected error',action.payload)
            state.status= 'rejected';
            state.error = action.error.message

        })
    }

})


export const productDetail = (state)=>state.productDetail.productDetail;
export const productStatus = (state)=>state.productDetail.status;
export const productsError = (state)=>state.productDetail.error;



export default fetchProductDetailSlice.reducer;
