import React,{useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {clearCart} from '../reduxStore/user/cartSlice'

function PaymentSuccess() {

const dispatch = useDispatch();

useEffect(()=>{
  dispatch(clearCart())
},[])

  const wrapper = {
    width:'100%',
    minHeight:"100vh",
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    padding:'5rem'
  }
  const p ={
    fontSize:'3rem'
  }
  return (
    <div style={wrapper}>
       <div>
         <p style={p}>your payment is succefully completed,
          order confirmation mail will send to your email id
         </p>

       </div>
    </div>
  )
}

export default PaymentSuccess

