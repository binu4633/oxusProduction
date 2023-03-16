import React from "react";
import uuid from "react-uuid";
import classes from "./CartScreen.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../../reduxStore/user/userSlice";
import {toggleLoginMenu} from '../../../reduxStore/user/uiSlice'
import {getShippingAddress} from '../../../reduxStore/user/addressSlice'
import CartCollection from "./CartCollection";

function CartScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const userInfo = useSelector(getUserInfo);
  const address = useSelector(getShippingAddress);
  const cartedProduct = useSelector((state) => state.cart.products);
  const subtotal = useSelector((state) => state.cart.subTotal);
  const qty = useSelector((state) => state.cart.totalQty);

  const onBackHandler = () => {
  
    navigate(-1);
  };

  const onCheckoutHandler = ()=>{
    navigate('/order/shipping/member')
  }

  const onGuestCheckoutHandler = ()=>{
    if (Object.keys(address).length >0){
      navigate('/order/checkout')
    }else{

      navigate('/order/shipping/guest')
    }
  }

  const onMemberCheckoutHandler = ()=>{
      dispatch(toggleLoginMenu())
  }

  return (
    <div className={classes.cart_screen}>
      <div className={classes.heading}>
        <h3>Your Cart</h3>
      </div>

      {qty > 0 && (
        <div>
          <div className={classes.sub_heading}>
            <div className={classes.sub_heading_product}> Product</div>
            <div className={classes.sub_heading_qty}> quantity</div>
            <div className={classes.sub_heading_total}> total</div>
          </div>
          {cartedProduct.map((product) => (
            <CartCollection product={product} key={uuid()} />
          ))}

          <div className={classes.cart_checkout}>
            {/* <div className={classes.note}>
          <p>Add a note to your order</p>
          <form  className={classes.form}>
            <div>
              <textarea name="" id="" cols="30" rows="6"></textarea>
            </div>
            <div>
              <button className={classes.btn_textarea}>Add</button>
            </div>
          </form>
        </div> */}
            <div className={classes.checkout}>
              <p className={classes.sub_total}>subtotal:  <span className={classes.subtotal__span}>{subtotal}</span> </p>
              <p className={classes.sub_total_comment}>
                Tax included SHIPPING calculated at checkout.
              </p>
              { !userInfo &&
             <div>
              <div>
                <button type="button" className={classes.btn_checkout_guest} onClick={onGuestCheckoutHandler} >
                  GUEST CHECKOUT
                </button>
              </div>
              <div>
                <button type="button" className={classes.btn_checkout_guest} onClick={onMemberCheckoutHandler}>
                  MEMBER CHECKOUT
                </button>
              </div>
              </div>
              }
              {userInfo && 
                <div>
                <button type="button" className={classes.btn_checkout_guest} onClick={onCheckoutHandler}>
                 CHECKOUT
                </button>
                </div>
              }
             
            </div>
          </div>
        </div>
      )}
      {qty === 0 && (
        <div className={classes.error_box}>
          <div>
            <p> no product in the cart </p>
          </div>
          <div>
            <button className={classes.btn_back} onClick={onBackHandler}>
              back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartScreen;
