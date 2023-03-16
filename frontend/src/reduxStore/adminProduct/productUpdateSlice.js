import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';


const initialState = {
    nameUpate:null,
    status:'idle',
    error:null
}


export const updateProduct = createAsyncThunk('product/updateProductDetail',async(payLoad)=>{
    //  console.log(payLoad);
   try {
    const response = await axios.patch(`/api/products/updateProductDetail/${payLoad.id}`,{
        ...payLoad.update
       },{
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
        
        },
      })
        
        return response.data 
    } catch (error) {
    //    console.log('err',error);
       if(error.response.data){
          return  error.response.data
       }
        return error
    }
});


