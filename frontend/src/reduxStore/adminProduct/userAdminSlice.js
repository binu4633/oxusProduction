import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    users:[],
    pageCount:1,
    userDetail:null,
    status:'idle',
    error:null
}

export const findUsers = createAsyncThunk('users/findusers',async(query)=>{


    try {
        let response 
        if(query){
            response = await axios.get(`/api/userAdmin/users/${query}`,{
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
                
                },
              }) 
        }else{

             response = await axios.get('/api/userAdmin/users',{
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
                
                },
              })
        }
         // console.log(response)
         return response.data
     } catch (error) {
        // console.log('err',error);
        if(error.response.data){
           return  error.response.data
        }
         return error
     }
 });
export const findUserDetail = createAsyncThunk('users/finduserDetail',async(id)=>{


    try {
     const response = await axios.get(`/api/userAdmin/user/${id}`,{
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
        
        },
      })
         // console.log(response)
         return response.data
     } catch (error) {
        // console.log('err',error);
        if(error.response.data){
           return  error.response.data
        }
         return error
     }
 });


 const userAdminSlice = createSlice({
    name:'users',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(findUsers.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(findUsers.fulfilled,(state,action)=>{
            state.status= 'succeeded';
            // console.log('produtss', action.payload);
            // state.product.push(action.payload)
            state.users = action.payload.users;
            state.pageCount = action.payload.pages
            state.error = action.payload.error || action.payload.message
            // return  action.payload

        })
        .addCase(findUsers.rejected,(state,action)=>{
            // console.log('anoth er', action );
            state.status= 'rejected';
            state.error = action.error.message

        })
        .addCase(findUserDetail.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(findUserDetail.fulfilled,(state,action)=>{
            state.status= 'succeeded';
            // console.log('produtss', action.payload);
            // state.product.push(action.payload)
            state.userDetail = action.payload.user;
            state.error = action.payload.error || action.payload.message
            // return  action.payload

        })
        .addCase(findUserDetail.rejected,(state,action)=>{
            // console.log('anoth er', action );
            state.status= 'rejected';
            state.error = action.error.message

        })
    

    }})


export const getUsers = (state)=>state.userAdmin.users;
export const getPageCount = (state)=>state.userAdmin.pageCount;
export const getUserDetail = (state)=>state.userAdmin.userDetail;
export const userStatus = (state)=>state.userAdmin.status;
export const userError = (state)=>state.userAdmin.error;


export default userAdminSlice.reducer;