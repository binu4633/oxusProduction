import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {getShippingAddress} from '../../../reduxStore/user/addressSlice';
import classes from './CheckoutAddress.module.css';
import {useNavigate} from 'react-router-dom';
import {editAddressOn} from '../../../reduxStore/user/uiSlice'
import {getUserInfo} from '../../../reduxStore/user/userSlice'

function CheckoutAddress() {
    const navigate = useNavigate();
    const shippingAddress = useSelector(getShippingAddress);
    const shippingPath = useSelector(state=>state.ui.shippingPath);
    const dispatch = useDispatch()
    const userInfo = useSelector(getUserInfo)
    // console.log('the shipping adddresss', shippingAddress)

  const onEditAddressHandler = ()=>{
    // navigate("/order/shipping/guest");
    if(userInfo){
      navigate('/order/shipping/member')
    }else{
      navigate('/order/shipping/guest')
    }
    // navigate(shippingPath);
    dispatch(editAddressOn())
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.box}>
        {shippingAddress &&
    <div>
        <p className="p">{shippingAddress.name}</p>
        <p className="p">{shippingAddress.email}</p>
        <p className="p">{shippingAddress.phoneNumber}</p>
        <p className="p">{shippingAddress.address}</p>
        <p className="p">{shippingAddress.place}</p>
        <p className="p">{shippingAddress.city}</p>
        <p className="p">{shippingAddress.state}</p>
        <p className="p">{shippingAddress.pinCode}</p>
    </div>
        }
       <button className={classes.btn_edit} onClick={onEditAddressHandler}>edit address</button>
    </div>
    </div>
  )
}

export default CheckoutAddress
