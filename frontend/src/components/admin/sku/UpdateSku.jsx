import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import { useSelector, useDispatch } from "react-redux";
import {
  findSize,
  productSize,
  getCategoryStatus,
} from "../../../reduxStore/adminProduct/categoryAndSizeSlice";

import {
  updateSku,
  updatedSku,
  getSkuStatus,
  getSkuUpdateError,
} from "../../../reduxStore/adminProduct/skuSlice";

import classes from "./AddSku.module.css";

function UpdateSku({ product }) {
  const dispatch = useDispatch();

  const skuUpdated = useSelector(updatedSku);
  const skustats = useSelector(getSkuStatus);
  const skuError = useSelector(getSkuUpdateError);



  const [enteredColor, setEnteredColor] = useState("");
  const [enteredSize, setEnteredSize] = useState("");
  const [enteredQty, setEnteredQty] = useState("");
  const [formError, setFormError] = useState(false);
  const [skuQty,setSkuQty] = useState('')

  const [isColor, setIsColor] = useState(false);

  // console.log("product from add sku", product.sku);

  let productColorArray;

  if (product && product.colors) {
    productColorArray = [...product.colors];
    productColorArray.unshift({ color: "select one" });
  }
  let sizeArray;

  if (product && product.sku && isColor) {
    sizeArray = product.sku
      .filter((pr) => pr.color === enteredColor)
      .map((pr) => pr.size);
    sizeArray.unshift("select one");
   
  }



  let productSizeType;

  if (product && product.sizeType) {
    productSizeType = product.sizeType;
  }

  useEffect(() => {
    dispatch(findSize(productSizeType));
  }, [product]);



  const colorChangeHandler = (e) => {
    if (e.target.value === "select one") {
      return;
    }

    setEnteredColor(e.target.value);
    setIsColor(true);
  };

  const sizeChangeHandler = (e) => {
    if (e.target.value === "select one") {
      return;
    }
    if(product){
       
        setSkuQty(product.sku.filter(pr=>pr.color === enteredColor && pr.size===e.target.value)[0].qty)
    }
    setEnteredSize(e.target.value);
  };

  const qtyChangeHandler = (e) => {
    setEnteredQty(e.target.value);
  };

  const formSubmitHanlder = (e) => {
    e.preventDefault();
    
    if (!enteredColor || !enteredSize || !enteredQty) {
      setFormError(true);
      return;
    }

    // console.log(
    //   "form submit",
    //   product.sku
    //     .filter((pr) => pr.color === enteredColor && pr.size === enteredSize)
    //     .map((pr) => pr.sku)[0]
    // );

    const sku = product.sku
      .filter((pr) => pr.color === enteredColor && pr.size === enteredSize)
      .map((pr) => pr.sku)[0];

    const newSku = {
      sku,
      qty: enteredQty,
    };

    const skuObj = {
      id: product._id,
      sku: newSku,
    };

    dispatch(updateSku(skuObj));

  
    setFormError(false);
  };

  return (
    <div className={classes.wrapper}>
    
      <form className={classes.form} onSubmit={formSubmitHanlder}>
        <div>
          <label>
            Color:
            <select onChange={colorChangeHandler} value={enteredColor}>
              {productColorArray &&
                productColorArray.map((pr) => (
                  <option key={uuid()} value={pr.color}>
                    {pr.color}
                  </option>
                ))}
            </select>
          </label>
        </div>

        {isColor && (
          <div>
            <label>
              Size:
              <select onChange={sizeChangeHandler} value={enteredSize}>
                {sizeArray &&
                  sizeArray.map((sz) => (
                    <option key={uuid()} value={sz}>
                      {sz}
                    </option>
                  ))}
              </select>
            </label>
            {skuQty && <p className="p">current quantity : {skuQty}</p>}
          </div>
        )}
        <div>
          <label>
            quantity:
            <input
              type="number"
              //   className={priceInputClass}
              onChange={qtyChangeHandler}
              //   onBlur={priceBlurHandler}
              value={enteredQty}
            />
          </label>
        </div>
        <button className="btn_adn">submit</button>
        {formError && <p className="p">all field must be filled</p>}
        {skuUpdated && (
          <div>
            {skuUpdated.color ? <p className="p">color : {skuUpdated.color}</p> : ""}
            {skuUpdated.size ? <p className="p">size : {skuUpdated.size}</p> : ""}
            {skuUpdated.qty ? <p className="p">total quatity : {skuUpdated.qty}</p> : ""}
          </div>
        )}
      </form>
    </div>
  );
}

export default UpdateSku;
