import React from 'react';
import PinCheck from '../components/user/shipping/PinCheck';
import MemberShippingAddress from '../components/user/shipping/MemberShippingAddress';
function MemberShipping() {
  return (
    <div style={{backgroundColor:'var(--bg-1)',minHeight:'100vh'}}>
      <PinCheck />
      <MemberShippingAddress />
    </div>
  )
}

export default MemberShipping
