import React from 'react'

function PaymentFailedPage() {
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
      <p style={p}>your payment attempt is failed now,
      please try again later
      
      </p>

    </div>
 </div>
  )
}

export default PaymentFailedPage
