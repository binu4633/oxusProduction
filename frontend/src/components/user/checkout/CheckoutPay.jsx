import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useStripe } from "@stripe/react-stripe-js";
import classes from "./CheckoutPay.module.css";
import { calculateShippingCharge } from "../../../reduxStore/user/cartSlice";

import {
  getShippingAddress,
  // shppingError,
  // getShippingCharge,
} from "../../../reduxStore/user/addressSlice";
import { shippingStats } from "../../../reduxStore/user/cartSlice";
import {
  addShippingCharge,
  findGrandTotal,
} from "../../../reduxStore/user/cartSlice";
import { getUserInfo } from "../../../reduxStore/user/userSlice";
// import {guestPayment,memberPayment,paymentStatss,getUrl} from '../../../reduxStore/user/paymentSlice'
import {
  guestPayment,
  memberPayment,
  paymentStatss,
  getSessionId,
  couponInvalid,
  removeCouponInvalid,
  addCoupon,
  removeCoupon,
  enteredCoupon,
  removeFromOutOfStock
} from "../../../reduxStore/user/paymentSlice";
import OutOfStock from "./OutOfStock";
function CheckoutPay() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const totalQty = useSelector((state) => state.cart.totalQty);
  const subTotal = useSelector((state) => state.cart.subTotal);
  const shippingCharge = useSelector((state) => state.cart.shippingCharge);
  const grandTotal = useSelector((state) => state.cart.grandTotal);
  const shippingAddress = useSelector(getShippingAddress);
  const userInfo = useSelector(getUserInfo);
  const invalidCoupon = useSelector(couponInvalid);
  const sessionId = useSelector(getSessionId);
  const couponInputRef = useRef();
  // const [enteredCoupon, setEnteredCoupon] = useState("");
  const [haveCoupon, setHaveCoupon] = useState(false);
  const coupon = useSelector(enteredCoupon)
  // const stripeUrl = useSelector(getUrl)
  // const error = useSelector(shppingError);
  // const shippingAmount = useSelector(getShippingCharge);
  const stats = useSelector(shippingStats);
  const paymentStats = useSelector(paymentStatss);

  const products = useSelector((state) => state.cart.products);
  // console.log('products', products);
  // console.log('stripe', stripeUrl)

  //   useEffect(() => {
  //     if (totalQty && shippingAddress) {
  //       const shipObj = {
  //         totalQty,
  //         pin: shippingAddress.pinCode,
  //       };
  //       dispatch(calculateShippingCharge(shipObj));

  //     }
  //   }, []);

  // useEffect(() => {
    // if(stripeUrl){
    //   // navigate(stripeUrl)
    //   // window.open(stripeUrl,'_top')
    //   // window.open(stripeUrl)
    //   window.location.replace(stripeUrl)
    // }
    // if(sessionId){
    //  const {error} = stripe.redirectToCheckout({sessionId});
    //  if(error){
    //   console.log('stripe error', error)
    //  }
    // }
  // }, [paymentStats === "succeeded"]);

  useEffect(() => {
    const dispatchTrigger = {
      shippingCharge: true,
      calculateShipping: true,
    };
  
    if (totalQty && shippingAddress) {
   
      if (dispatchTrigger.calculateShipping) {
        const shipObj = {
          totalQty,
          pin: shippingAddress.pinCode,
        };
    
        dispatch(calculateShippingCharge(shipObj));
        //   dispatch(findGrandTotal())
      }
  
      return () => {
        dispatchTrigger.calculateShipping = false;
      };
    }
    // if (shippingAmount && shippingAmount.status === "success"){
    //     console.log('use effect is running with dependencies')
    //     // if(dispatchTrigger.shippingCharge){
    //     //     dispatch(addShippingCharge(shippingAmount.shippingCharge));

    //     //     return ()=>{
    //     //         dispatchTrigger.shippingCharge = false
    //     //     }
    //     // }

    // }
  }, [totalQty, shippingAddress]);

  // useEffect(()=>{
  //     console.log('shipping amount', shippingAmount);
  //     console.log('shipping stats', shippingAmount.status);
  //   if (shippingAmount && shippingAmount.status === "success"){
  //     console.log('this useeffect is running on grand total')
  //       console.log('the shipping amount', shippingAmount.shippingCharge)
  //       let dispatchTrigger = {
  //         grandTotal:true
  //       };
  //        if(dispatchTrigger.grandTotal){
  //           dispatch(addShippingCharge(shippingAmount.shippingCharge));
  //           // console.log('useEfect runnig lower effect')
  //           return ()=>{
  //               dispatchTrigger.grandTotal = false;
  //           }
  //        }

  //   }
  // },[shippingAmount.shippingCharage])
  //   useEffect(() => {

  //     if (totalQty && shippingAddress) {
  //         let dispatchTrigger = true;
  //       const shipObj = {
  //         totalQty,
  //         pin: shippingAddress.pinCode,
  //       };
  //       console.log('useEfect runnig upper effect')
  //       dispatch(calculateShippingCharge(shipObj));
  //       return ()=>{
  //         dispatchTrigger = false;
  //     }
  //     }
  //   }, [totalQty,shippingAddress]);

  const onGuestPayment = async() => {
    const cartProduct = products.map((pr) => {
      return {
        _id: pr._id,
        sku: pr.sku,
        quantity: pr.quantity,
      };
    });
    let order;
    if (coupon) {
      order = {
        // products,
        cartProduct,
        shippingAddress,
        coupon,
      };
    } else {
      order = {
        // products,
        cartProduct,
        shippingAddress,
      };
    }
    const response = await  dispatch(guestPayment(order));

    if (response.payload.sessionId) {
      const { sessionId } = response.payload;
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
    
      }
    }
  };

  const onMemberPayment = async () => {
    const cartProduct = products.map((pr) => {
      return {
        _id: pr._id,
        sku: pr.sku,
        quantity: pr.quantity,
      };
    });
    let order;
    if (coupon) {
      order = {
        // products,
        cartProduct,
        shippingAddress,
        coupon,
      };
    } else {
      order = {
        // products,
        cartProduct,
        shippingAddress,
      };
    }

    const response = await dispatch(memberPayment(order));

    if (response.payload.sessionId) {
      const { sessionId } = response.payload;
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
       
      }
    }

    //  console.log('response from function', response)
  };

  const haveCouponHandler = () => {
    setHaveCoupon(!haveCoupon);
  };

  const couponSubmitHandler = (e) => {
    e.preventDefault();
    const coupon = couponInputRef.current.value;
    dispatch(addCoupon(coupon));
    dispatch(removeCouponInvalid())
    // setEnteredCoupon(coupon);
    //  console.log(coupon)
  };

  const onDeleteCoupon = () => {
    // setEnteredCoupon(null);
    // setHaveCoupon(false);
    dispatch(removeCouponInvalid());
    dispatch(removeCoupon())
  };

  return (
    <div className={classes.wrapper}>
      <div>
      <p className="p">total quantity : {totalQty}</p>
      <p className="p">sub Total : {subTotal}</p>
      <p className="p">shipping Charge : {shippingCharge}</p>
      {/* <p className="p">shipping Charge {shippingAmount? shippingAmount.shippingCharge :''}</p> */}
      <p className="p">grand Total : {grandTotal}</p>
      </div>
     
      {shippingAddress && products.length > 0 && (
        <div>
          <div>
            <button className={classes.have_coupon} onClick={haveCouponHandler}>
              <p className="p">have a coupon ?</p>
            </button>
          </div>

          {haveCoupon && (
            <div >
              {/* <button><p className="p">coupon </p></button> */}
              <form onSubmit={couponSubmitHandler}   className={classes.coupon__form}>
                <input
                  className={classes.coupon__input}
                  type="text"
                  ref={couponInputRef}
                />
                <button className={classes.coupon__button}>add</button>
              </form>
            </div>
          )}
       
          {coupon && (
            <div className={classes.coupon__delete__div}>
            <p className="p">
              coupon :{coupon}{" "}
              <button
                className={classes.coupon_delete_btn}
                onClick={onDeleteCoupon}
              >
                delete
              </button>{" "}
            </p>
            </div>
          )}
         
          {invalidCoupon &&  <div className={classes.coupon__invalid}> <p className="p">{invalidCoupon}</p></div>}

          {userInfo && (
            <button onClick={onMemberPayment} className={classes.payment__btn}>
              <p className="p">continue to payment member</p>{" "}
            </button>
          )}
          {!userInfo && (
            <button onClick={onGuestPayment} className={classes.payment__btn}>
              <p className="p">continue to payment guest</p>{" "}
            </button>
          )}
          <OutOfStock />
        </div>
      )}
    </div>
  );
}

export default CheckoutPay;
