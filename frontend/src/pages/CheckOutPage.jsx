import React from 'react';
import CheckoutAddress from '../components/user/checkout/CheckoutAddress';
import CheckoutPay from '../components/user/checkout/CheckoutPay';

function CheckOutPage() {

  const style = {
    minHeight:'100vh',
    backgroundColor:'var(--bg-1)'

  }

  return (
    <div  style={style}>
      <CheckoutAddress />
      <CheckoutPay />
    </div>
  )
}

export default CheckOutPage
