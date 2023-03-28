import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const initialState = {

// }


export const orderReturn = createAsyncThunk('order/returnOrder',async(returnDetail)=>{
    try {
        const response = await axios.post('/api/order/return',returnDetail);
        return response.data;
    } catch (error) {
        
    }
})