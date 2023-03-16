import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import classes from "./AdminMenu.module.css";
import useWindowSize from "../../hooks/use-windowSize";
function AdminMenu() {
  const navigate = useNavigate();
  const size = useWindowSize();
  const [productDisplay, setProductDisplay] = useState(false);
  const [mobileMenuOn, setMobileMenuOn] = useState("inactive");
  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  useEffect(() => {
    if (size.width <= 900) {
      setMobileMenuOn("off");
    } else {
      setMobileMenuOn("inactive");
    }
  }, [size.width]);
  const productDisplayHandler = () => {
    setProductDisplay(!productDisplay);
  };

  const onProucts = () => {
    navigate("/auth/admin/product/products");
  };
  const onAddProduct = () => {
    navigate("/auth/admin/product/addProducts");
  };
  const onAddSku = () => {
    navigate("/auth/admin/product/sku");
  };
  const onAddColor = () => {
    navigate("/auth/admin/product/addColors");
  };
  const onAddBase = () => {
    navigate("/auth/admin/product/addProductbase");
  };

  const orderDisplay = () => {
    navigate("/auth/admin/orders");
  };
  const userDisplay = () => {
    navigate("/auth/admin/users");
  };

  const mobileMenuHandler = () => {
    // setMobileMenuOn(!mobileMenuOn);

    // if(size.width <= 900){
    //   setMobileMenuActive(true)
    // }else{
    //   setMobileMenuActive(false)
    // }

    if (size.width <= 900) {
      setMobileMenuOn(mobileMenuOn === "on" ? "off" : "on");
    } else {
      setMobileMenuActive("inactive");
    }
  };

  const style1 = {
    transform: "translateX(0%)",
    transition: "all .5s",
  };
  const style2 = {
    transform: "translateX(-85%)",
    transition: "all .5s",
  };
  const style3 = {
    transform: "none",
  };
  //style={{transform:mobileMenuOn && mobileMenuActive? 'translateX(0%)' :'translateX(-90%)'}}

  return (
    <div
      className={classes.admin_menu}
      style={
        mobileMenuOn === "on"
          ? style1
          : mobileMenuOn === "off"
          ? style2
          : style3
      }
    >
      <div className={classes.menu__links}>
        <div className={classes.link_wrapper}>
          <button className={classes.btn__main} onClick={productDisplayHandler}>
            product
          </button>
        </div>

        {productDisplay && (
          <div className={classes.product__menu}>
            <div>
              

              <button className={classes.btn__sub} onClick={onProucts}>
                products
              </button>
            </div>
            <div>
              <button className={classes.btn__sub} onClick={onAddProduct}>
                add products
              </button>
            </div>
            <div>
              <button className={classes.btn__sub} onClick={onAddSku}>
                add sku
              </button>
            </div>
            <div>
              <button className={classes.btn__sub} onClick={onAddColor}>
                add colors
              </button>
            </div>
            <div>
              <button className={classes.btn__sub} onClick={onAddBase}>
                add base
              </button>
            </div>
            
          </div>
        )}

        <div className={classes.link_wrapper}>
          <button className={classes.btn__main} onClick={orderDisplay}>
            order
          </button>
        </div>
        <div className={classes.link_wrapper}>
          <button className={classes.btn__main} onClick={userDisplay}>
            user
          </button>
        </div>
      </div>
      <div className={classes.menu__div}>
                <button
                  className={classes.menu__btn}
                  onClick={mobileMenuHandler}
                >
                  <div className={classes.menu__line}></div>
                  <div className={classes.menu__line}></div>
                  <div className={classes.menu__line}></div>
                </button>
              </div>
    </div>
  );
}

export default AdminMenu;
