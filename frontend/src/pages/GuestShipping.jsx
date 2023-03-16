import React from 'react';
import {useDispatch} from 'react-redux'
import PinCheck from '../components/user/shipping/PinCheck';
import GuestShippingAddress from '../components/user/shipping/GuestShippingAddress';
import classes from './GuestShipping.module.css';
import {toggleGuestAddressDisplay} from '../reduxStore/user/uiSlice'

function GuestShipping() {
const dispatch = useDispatch()

const onAddAddressDisplay = ()=>{
    
    dispatch(toggleGuestAddressDisplay())
}
 
  return (
    <div  style={{backgroundColor:'var(--bg-1)',minHeight:'100vh'}}>
        <PinCheck />
       <div className={classes.address_block}>
         <button className={classes.btn_address} onClick={onAddAddressDisplay}>add address</button>
       </div>
       <GuestShippingAddress />
    </div>
  )
}

export default GuestShipping
