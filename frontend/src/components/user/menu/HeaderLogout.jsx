import React from "react";
import { useSelector,useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
import {toggleLogoutMenu} from '../../../reduxStore/user/uiSlice';
import {logout} from '../../../reduxStore/user/userSlice'
import classes from "./HeaderLogout.module.css";
function HeaderLogout() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
  const logoutStats = useSelector((state) => state.ui.logoutMenu);

const logoutHandler = ()=>{
   dispatch(logout())
   dispatch(toggleLogoutMenu())
}

const onProfileHandler = ()=>{
  navigate('/profile')
  dispatch(toggleLogoutMenu())
}

  return (
    <div style={{ display: logoutStats ? "block" : "none" }}>
      <div className={classes.wrapper} >
        <div className={classes.logout_body}>
          <button  onClick={logoutHandler}>logout</button>
        </div>
        <div className={classes.logout_body}>
          <button onClick={onProfileHandler}>profile</button>
        </div>
      </div>
    </div>
  );
}

export default HeaderLogout;
