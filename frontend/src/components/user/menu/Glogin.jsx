import React from 'react';
import {useDispatch} from 'react-redux';
import { GoogleLogin } from "@moeindana/google-oauth";
import {googleAuth} from '../../../reduxStore/user/userSlice'
function Glogin() {
      const dispatch = useDispatch();

    const onSucess = async (response) => {
       
        const token = response.credential;
        dispatch(googleAuth(token))
        // const serverResponse = await axios.post("/api/user//google/login", {
        //   token,
        // });
        // console.log('server response', serverResponse)
      };
  return (
    <div>
      <GoogleLogin
      
        onSuccess={onSucess}
        onError={(e) => {
          // console.log("Login Failed",e);
        }}
        // redirect_uri='http://127.0.0.1:3000'
        redirect_uri={window.location.origin}
        SECURE_REFERRER_POLICY = "no-referrer-when-downgrade"
      />
    </div>
  )
}

export default Glogin
