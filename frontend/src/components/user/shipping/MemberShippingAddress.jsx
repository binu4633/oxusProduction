import React from 'react';
import {useDispatch} from 'react-redux'
import classes from './MemberShipAddress.module.css';
import MemberShipAddressForm from './MemberShipAddressForm';
import {toggleMemberAddressDisplay} from '../../../reduxStore/user/uiSlice';
import MemberAddressList from './MemberAddressList';
import MemberAddressEditForm from './MemberAddressEditForm';
function MemberShippingAddress() {
  const dispatch = useDispatch();
const onFormDisplay = ()=>{
    dispatch(toggleMemberAddressDisplay())
}

  return (
    <div>
       <button className='btn btn_clr1' onClick={onFormDisplay}>add address</button>
       <MemberShipAddressForm />
       <MemberAddressList />
       <MemberAddressEditForm />
    </div>
  )
}

export default MemberShippingAddress
