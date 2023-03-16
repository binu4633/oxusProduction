import React from "react";
import classes from "./HeaderCart.module.css";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import { toggleCartMenu } from "../../../reduxStore/user/uiSlice";
import { useSelector, useDispatch } from "react-redux";
import HeaderCartCollection from "./HeaderCartCollection";
function HeaderCart() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const cartedProduct = useSelector((state) => state.cart.products);
  const subtotal = useSelector((state) => state.cart.subTotal);
  const menuCart = useSelector((state) => state.ui.cartMenu);
  // const signinMenu = useSelector(state=>state.ui.signinMenu);

  const style1 = {
    transform: "translateX(100%)",
  };
  const style2 = {
    transform: "translateX(0%)",
  };

  const menuCloseHandler = ()=>{
    dispatch(toggleCartMenu())
  }

  const gotoCartHandler = () => {
    dispatch(toggleCartMenu());
    navigate("/product_cart");
  };
  return (
    <div>
      <div className={classes.cart_screen} style={menuCart ? style2 : style1}>
        <div className={classes.menu_close}>
          <button onClick={menuCloseHandler}>X</button>
        </div>

        <div className={classes.heading}>
          <h3>Your Cart</h3>
        </div>

        <div className={classes.order__wrapper}>
        <div className={classes.sub_heading}>
          <div className={classes.sub_heading_product}> Product</div>
          <div className={classes.sub_heading_qty}> quantity</div>
          <div className={classes.sub_heading_total}> total</div>
        </div>
        {cartedProduct && cartedProduct.length > 0 && cartedProduct.map((product) => (
          <HeaderCartCollection product={product} key={uuid()} />
        ))}
        </div>

       

        <div className={classes.cart_checkout}>
          <div className={classes.checkout}>
            <div>
              <p className={classes.sub_total_comment}>
                Tax included SHIPPING calculated at checkout.{" "}
              </p>
            </div>
            <div>
              <p className={classes.sub_total}>{subtotal}</p>
            </div>
          </div>
          <div className={classes.goto_cart_wrapper}>
            <button
              type="button"
              className={classes.btn_goto_cart}
              onClick={gotoCartHandler}
            >
              GO TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderCart;
