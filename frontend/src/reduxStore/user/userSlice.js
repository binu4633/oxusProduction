import { createSlice,createAsyncThunk} from '@reduxjs/toolkit';
// import Cookies from 'js-cookie'
import axios from 'axios';




let  userInfo;
if(localStorage.getItem('userInfo') === undefined){
    // console.log('undefined works');
    localStorage.removeItem('userInfo');
    userInfo = null
}else{
    // console.log('undefined not  works');
     userInfo = localStorage.getItem('userInfo') 
     && localStorage.getItem('userInfo') !== undefined 
     && localStorage.getItem('userInfo') !== 'undefined'
    ?  JSON.parse( localStorage.getItem('userInfo'))
    : null
}  

// const userInfo = localStorage.getItem('userInfo') && localStorage.getItem('userInfo') !== undefined
//   ? JSON.parse( localStorage.getItem('userInfo'))
//   : null




const initialState = {
    status:'idle',
    // userInfo:null, // for user object
    userInfo:userInfo||null, // for user object
    isAuthenticated:false,
    forgetPassResult:null,
    forgetResetTokenResult:null,
    loginError: null,
    signInError:null,
    forgetPassError:null,
    forgetResetError:null,
    success: false, // for monitoring the registration process.
  }

  export const userRegister = createAsyncThunk('user/register',async(newUser)=>{
    try {
     const response = await axios.post('/api/user',{
         ...newUser
         })
       
         return response.data
     } catch (error) {
       
        if(error.response.data){
            return error.response.data
        }else{
            return error.message
        }
         
     }
 })
  export const userLogin = createAsyncThunk('user/Login',async(newUser)=>{
    try {
      
     const response = await axios.post('/api/user/login',{
         ...newUser
         })
        //  console.log(response)
         return response.data
     } catch (error) {
        // console.log(error);
        if(error.response.data){
            return error.response.data
        }else{
            return error.message
        }
     }
 })
  export const forgetPassword = createAsyncThunk('user/forgetPassword',async(newUser)=>{
    try {
      
     const response = await axios.post('/api/user/forgotPassword',{
         ...newUser
         })
        //  console.log(response)
         return response.data
     } catch (error) {
        // console.log(error);
        if(error.response.data){
            return error.response.data
        }else{
            return error.message
        }
     }
 });

 export const resetForgetPassword = createAsyncThunk('user/resetForgetPassword',async(pay)=>{
    try {
      
     const response = await axios.patch(`/api/user/resetForgetPassword/${pay.token}`,{
         password:pay.pass
         })
        //  console.log(response)
         return response.data
     } catch (error) {
        // console.log(error);
        if(error.response.data){
            return error.response.data
        }else{
            return error.message
        }
     }
 })




 export const googleAuth = createAsyncThunk('user/googleAuth', async(token)=>{
    try {
      
        const response = await axios.post("/api/user/googleAuth", {
            token
          });
           //  console.log(response)
            return response.data
        } catch (error) {
            if(error.response.data){
                return error.response.data
            }else{
                return error.message
            }
        }
 })


  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      logout: (state) => {
        localStorage.removeItem('userInfo') // deletes token from storage
        state.loading = false
        state.userInfo = null
        // state.userToken = null
        // state.error = null
      },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(userRegister.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(userRegister.fulfilled,(state,action)=>{
            state.status= 'succeeded';
            // console.log(action.payload);
            // state.product.push(action.payload)
            state.userInfo= action.payload.userInfo;
            state.signInError = action.payload.error;
            // state.userToken= action.payload.token
            // return  action.payload
            // localStorage.setItem('userToken',"Bearer "+action.payload.token)
            if(state.userInfo){
                localStorage.setItem('userInfo',JSON.stringify(action.payload.userInfo))
            }
           
        })
        .addCase(userRegister.rejected,(state,action)=>{
            state.status= 'rejected';
            state.error = action.error.message

        })
        .addCase(userLogin.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(userLogin.fulfilled,(state,action)=>{
            state.status= 'succeeded';
          
        
            state.userInfo= action.payload.userInfo;
            state.loginError = action.payload.error;
            localStorage.setItem('userInfo',JSON.stringify(action.payload.userInfo))
            // state.userToken= action.payload.token
            // return  action.payload
            // localStorage.setItem('userToken',"Bearer "+action.payload.token)
       
        })
        .addCase(userLogin.rejected,(state,action)=>{
            state.status= 'rejected';
            state.loginError = action.error.message

        })
        .addCase(resetForgetPassword.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase(resetForgetPassword.fulfilled,(state,action)=>{
            state.status= 'succeeded';
          
            state.forgetResetTokenResult = action.payload.status;
            state.userInfo= action.payload.userInfo;
            state.forgetResetError = action.payload.error;
            if( action.payload.status ==='failed'){
                state.forgetResetError =  action.payload.error
            }
            localStorage.setItem('userInfo',JSON.stringify(action.payload.userInfo));
            // state.userToken= action.payload.token
            // return  action.payload
            // localStorage.setItem('userToken',"Bearer "+action.payload.token)
       
        })
        .addCase(resetForgetPassword.rejected,(state,action)=>{
            state.status= 'rejected';
            state.error = action.error.message

        })



        .addCase( googleAuth.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase( googleAuth.fulfilled,(state,action)=>{
            state.status= 'succeeded';
            // state.product.push(action.payload)
            state.userInfo= action.payload.userInfo;
            state.error = action.payload.error;
            // state.userToken= action.payload.token
            // return  action.payload
            // localStorage.setItem('userToken',"Bearer "+action.payload.token)
            localStorage.setItem('userInfo',JSON.stringify(action.payload.userInfo))
            // if(action.payload.userInfo){
            //     const testCookie =`name=${action.payload.userInfo.name};email=${action.payload.userInfo.email}`

            //     Cookies.set('userInfo', testCookie)
            // }
        })
        .addCase( googleAuth.rejected,(state,action)=>{
            state.status= 'rejected';
            state.error = action.error.message

        })
        .addCase( forgetPassword.pending,(state,action)=>{
            state.status= 'loading'
        })
        .addCase( forgetPassword.fulfilled,(state,action)=>{
            state.status= 'succeeded';
            state.forgetPassResult = action.payload.message;
         
        })
        .addCase( forgetPassword.rejected,(state,action)=>{
            state.status= 'rejected';
            state.forgetPassError = action.error.message

        })
    },
  })

export const getUserInfo = (state)=>state.user.userInfo;
export const forgoResult = (state)=>state.user.forgetPassResult;
// export const userTokenuserToken = (state)=>state.userToken;
export const getUserStatus = (state)=>state.user.status;
export const getForgetResetResult = (state)=>state.user.forgetResetTokenResult;

export const loginError = (state)=>state.user.loginError;
export const signinError = (state)=>state.user.signInError;
export const forgoError = (state)=>state.user.forgetPassError;
export const forgoResetError = (state)=>state.user.forgetResetError;



// export const getUserSuccess = (state)=>state.userInfo.success;

export const { logout } = userSlice.actions;

export default  userSlice.reducer


// const config = {
//   headers: {
//     Authorization: `Bearer ${user.userToken}`,
//   },
// }
// const { data } = await axios.get(`/api/user/profile`, config)