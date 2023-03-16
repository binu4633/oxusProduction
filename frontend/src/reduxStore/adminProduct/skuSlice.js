import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
   addedSku:[],
   updatedSku:null,
   deletedResult:null,
    status:'idle',
    error:null,
    updateError:null,
    deleteError:null,
}

export const addSku = createAsyncThunk('product/addSku',async(skuObj)=>{
    // console.log(skuObj);
    try {
     const response = await axios.post(`/api/products/addSku/${skuObj.id}`,{
         ...skuObj.sku

         },{
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
            
            },
          })
         // console.log(response)
         return response.data
     } catch (error) {
        // console.log('error', error);
        if(error.response.data){
            return  error.response.data
        }

         return error.message
     }
 });
export const updateSku = createAsyncThunk('product/updateSku',async(skuObj)=>{
    // console.log(skuObj);
    try {
     const response = await axios.post(`/api/products/updateSku/${skuObj.id}`,{
         ...skuObj.sku

         },{
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
            
            },
          })
         // console.log(response)
         return response.data
     } catch (error) {
        // console.log('error', error);
        if(error.response.data){
            return  error.response.data
        }

         return error.message
     }
 });
export const deleteSku = createAsyncThunk('product/deleteSku',async(skuObj)=>{
    // console.log('skuobj', skuObj);
    try {
     const response = await axios.post(`/api/products/deleteSku/${skuObj.id}`,{
        skuid:skuObj.skuid
     },{
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
        
        },
      })
         // console.log(response)
         return response.data
     } catch (error) {
        // console.log('error', error);
        if(error.response.data){
            return  error.response.data
        }

         return error.message
     }
 });


 const skuSlice = createSlice({
    name:'sku',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addSku.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(addSku.fulfilled,(state,action)=>{
            state.status= 'succeeded';
            // console.log('namesssss', action.payload);
            // state.product.push(action.payload)
            state.addedSku = action.payload.result;
            state.error = action.payload.error || action.payload.message
            // return  action.payload

        })
        .addCase(addSku.rejected,(state,action)=>{
            // console.log('anoth er', action );
            state.status= 'rejected';
            state.error = action.error.message

        })
        .addCase(updateSku.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(updateSku.fulfilled,(state,action)=>{
            state.status= 'succeeded';
            // console.log('namesssss', action.payload);
            // state.product.push(action.payload)
            state.updatedSku = action.payload.result;
            state.updateError = action.payload.error || action.payload.message
            // return  action.payload

        })
        .addCase(updateSku.rejected,(state,action)=>{
            // console.log('anoth er', action );
            state.status= 'rejected';
            state.updateError = action.error.message

        })
        .addCase( deleteSku.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(deleteSku.fulfilled,(state,action)=>{
            state.status= 'succeeded';
            // console.log('namesssss', action.payload);
            // state.product.push(action.payload)
            state.deletedResult = action.payload.result;
            state.deleteError = action.payload.error || action.payload.message
            // return  action.payload

        })
        .addCase(deleteSku.rejected,(state,action)=>{
            // console.log('anoth er', action );
            state.status= 'rejected';
            state.deleteError = action.error.message

        })
    }
 })


 export const addedSku = (state)=>state.sku.addedSku;
 export const updatedSku = (state)=>state.sku.updatedSku;
 export const deletedResult = (state)=>state.sku.deletedResult;
 export const getSkuStatus = (state)=>state.sku.status;
 export const getSkuError = (state)=>state.sku.error;
 export const getSkuUpdateError = (state)=>state.sku.updateError;
 export const getSkuDeleteError = (state)=>state.sku.deleteError;


 export default skuSlice.reducer;
