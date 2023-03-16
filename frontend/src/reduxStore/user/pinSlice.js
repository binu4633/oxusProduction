import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    result:'',
  
    status:'idle',
    error:null,
   }

   export const pinCheck = createAsyncThunk('order/pincheck',async(pinObj)=>{
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


   const pinCheckSlice = createSlice({
    name:'pinCheck',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(pinCheck.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(pinCheck.fulfilled,(state,action)=>{
            state.status= 'succeeded';
            // console.log('color result',action.payload);
            // state.product.push(action.payload)
            state.error = action.payload.error
            state.result= action.payload;
           
          
            // return  action.payload

        })
        .addCase(pinCheck.rejected,(state,action)=>{

            // console.log('rejected error',action.payload)
            state.status= 'rejected';
            state.error = action.error.message

        })
    }

})


export const getPinResult = (state)=>state.pin.result;
export const pinStatus = (state)=>state.pin.status;
export const errorPin = (state)=>state.pin.error;



export default pinCheckSlice.reducer;