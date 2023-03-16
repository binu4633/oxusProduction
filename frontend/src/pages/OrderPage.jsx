import React,{useEffect} from 'react'
import {Outlet,Link} from 'react-router-dom';
import classes from './OrderPage.module.css';
import {useSelector,useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {editAddressOn} from '../reduxStore/user/uiSlice';
import {getUserInfo} from '../reduxStore/user/userSlice'
function OrderPage() {
    const dispatch = useDispatch()
    let pathName = useSelector(state=>state.ui.shippingPath);
    const navigate = useNavigate();
   const userInfo = useSelector(getUserInfo)

const shippingLinkHandler = ()=>{
    dispatch(editAddressOn())
    if(userInfo){
      navigate('/order/shipping/member')
    }else{
      navigate('/order/shipping/guest')
    }
    // navigate(pathName);
}

const style1 = {
    pointerEvents: "none",
    opacity:0.5
}
const style2 = {
    pointerEvents: "all",
    opacity:1
}


  return (
    <div className={classes.wrapper}>
      <div className={classes.order}>
         {/* <div className={classes.order__Link}> */}
            {/* <Link to={`${pathName}`} style={style2} className={classes.link}>shipping</Link> */}
             {/* <button className={classes.btn} onClick={shippingLinkHandler}>Shipping</button> */}
         {/* </div> */}
         {/* <div className={classes.order__Link}> */}
              {/* <Link to='checkout'  className={classes.link}>checkout</Link> */}
              {/* <button className={classes.btn} onClick={shippingLinkHandler}>Checkout</button> */}
         {/* </div> */}
         {/* <div className={classes.order__Link}> */}
              {/* <Link to='payment' className={classes.link}>payment</Link> */}
              {/* <button className={classes.btn} onClick={shippingLinkHandler}>payment</button> */}
         {/* </div> */}
      </div>
      <Outlet/>
    </div>
  )
}

export default OrderPage
