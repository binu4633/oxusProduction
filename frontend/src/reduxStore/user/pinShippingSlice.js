import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    result:'',
   
    status:'idle',
    error:null,
   }

   export const shippingPinCheck = createAsyncThunk('order/shippingPincheck',async(pinObj)=>{
        // console.log('the api is running');
    try {
        const response = await axios.post(`/api/order/checkPin`,pinObj)
            // console.log(response)
            return response.data
    } catch (error) {
        // console.log(error.response.data);
        if(error.response.data){
            return error.response.data
        }
        return error.message
    }
   })


   const shippingPinCheckSlice = createSlice({
    name:'shippingPinCheck',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(shippingPinCheck.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(shippingPinCheck.fulfilled,(state,action)=>{
            state.status= 'succeeded';
            // console.log('color result',action.payload);
            // state.product.push(action.payload)
            state.error = action.payload.error
            state.result= action.payload;
            state.status='idle'
            // console.log('from slice payload, state.result', action.payload);
            // return  action.payload

        })
        .addCase(shippingPinCheck.rejected,(state,action)=>{

            // console.log('rejected error',action.payload)
            state.status= 'rejected';
            state.error = action.error.message

        })
    }

})


export const getPinShipResult = (state)=>state.shippingPin.result;
export const pinStatus = (state)=>state.shippingPin.status;
export const errorPin = (state)=>state.shippingPin.error;



export default shippingPinCheckSlice.reducer;