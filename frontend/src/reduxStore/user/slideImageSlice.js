import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    images:[],
    status:'idle',
    error:null,
   }

   export const fetchImages = createAsyncThunk('product/fetchImages',async(id)=>{
    //   console.log('color',color);
    try {
        const response = await axios.get(`/api/products/fetchImages/${id}`)
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


const fetchImagesSlice = createSlice({
    name:'fetchImages',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchImages.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(fetchImages.fulfilled,(state,action)=>{
            state.status= 'succeeded';
            // console.log('color result',action.payload);
            // state.product.push(action.payload)
            state.error = action.payload.error
            state.images= action.payload.result;
            // return  action.payload

        })
        .addCase(fetchImages.rejected,(state,action)=>{

            // console.log('rejected error',action.payload)
            state.status= 'rejected';
            state.error = action.error.message

        })
    }

})


export const getImages = (state)=>state.sliderImages.images;
export const imageStatus = (state)=>state.sliderImages.status;
export const imageError = (state)=>state.sliderImages.error;



export default fetchImagesSlice.reducer;
