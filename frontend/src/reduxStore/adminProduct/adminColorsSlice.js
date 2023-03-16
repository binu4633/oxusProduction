import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    addColor:[],
    updateColor:'',
    deleteResponse:'',
    status:'idle',
    error:null,
    editError:null,
}


export const addColors = createAsyncThunk('product/addColors',async(color)=>{
    //   console.log('color',color);
    try {
        const response = await axios.post(`/api/products/addColors/${color.id}`,color.colorObj,{
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
            
            },
          })
          
            return response.data
    } catch (error) {
     
        if(error.response.data){
            return error.response.data
        }
        return error.message
    }
});

export const updateColors = createAsyncThunk('product/updateColors',async(color)=>{
    //   console.log('color',color);
    try {
        const response = await axios.post(`/api/products/updateColors/${color.id}`,color.colorObj,{
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
            
            },
          })
          
            return response.data
    } catch (error) {
       
        if (error.response.data){
            return error.response.data
        }
        return error.message
    }
});
export const deleteColor = createAsyncThunk('product/deleteColors',async(clr)=>{
     
    try {
        const response = await axios.post(`/api/products/deleteColor/${clr.id}`,{
            color:clr.color
        },{
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
            
            },
          })
            
            return response.data
    } catch (error) {
        
        if (error.response.data){
            return error.response.data
        }
        return error.message
    }
});


const addColorSlice = createSlice({
    name:'addColors',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addColors.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(addColors.fulfilled,(state,action)=>{
            state.status= 'succeeded';
            // console.log('color result',action.payload);
            // state.product.push(action.payload)
            state.error = action.payload.error
            state.addColor= action.payload.color;
            // return  action.payload

        })
        .addCase(addColors.rejected,(state,action)=>{

            // console.log('rejected error',action.payload)
            state.status= 'rejected';
            state.error = action.error.message

        })
        .addCase(updateColors.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(updateColors.fulfilled,(state,action)=>{
            state.status= 'succeeded';
            // console.log('color result',action.payload);
            // state.product.push(action.payload)
            state.editError = action.payload.error
            state.updateColor= action.payload.color;
            // return  action.payload

        })
        .addCase(updateColors.rejected,(state,action)=>{

            // console.log('rejected error',action.payload)
            state.status= 'rejected';
            state.editError = action.error.message

        })
        .addCase(deleteColor.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(deleteColor.fulfilled,(state,action)=>{
            state.status= 'succeeded';
            // console.log('color result',action.payload);
            // state.product.push(action.payload)
            state.editError = action.payload.error
            state.deleteResponse= action.payload.response;
            // return  action.payload

        })
        .addCase(deleteColor.rejected,(state,action)=>{

            // console.log('rejected error',action.payload)
            state.status= 'rejected';
            state.editError = action.error.message

        })
}
})

export const addColorResult = (state)=>state.adminColor.addColor;
export const getadminColorStatus = (state)=>state.adminColor.status;
export const getAdminColorError = (state)=>state.adminColor.error;
export const updateColorResult = (state)=>state.adminColor.updateColor;
export const getUpdateError = (state)=>state.adminColor.editError;
export const getDeleteResponse = (state)=>state.adminColor. deleteResponse;


export default addColorSlice.reducer;