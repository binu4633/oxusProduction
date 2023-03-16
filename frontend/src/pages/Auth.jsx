import React from 'react';
import {Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux'
import {getUserInfo} from '../reduxStore/user/userSlice'


function Auth() {
  const userInfo = useSelector(getUserInfo);
    // const auth = true

  return (
    <div>
      
      {userInfo && userInfo.isAdmin && <Outlet/> }
      {/* <Outlet/>  */}
    </div>
  )
}

export default Auth