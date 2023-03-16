import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import { useSelector, useDispatch } from "react-redux";
import {
  findSize,
  productSize,
  getCategoryStatus,
} from "../../../reduxStore/adminProduct/categoryAndSizeSlice";
import Loader from "../../../utils/Loader";

import {addSku,addedSku,getSkuStatus,getSkuError} from '../../../reduxStore/adminProduct/skuSlice'

import classes from "./AddSku.module.css";

function AddSku({ product }) {
  const dispatch = useDispatch();

  const size = useSelector(productSize);

  const skuResult = useSelector(addedSku);
  const skuStatus = useSelector(getSkuStatus);
  const skuError = useSelector(getSkuError)

  // console.log("size", size.sizes);



  const [enteredColor, setEnteredColor] = useState("");
  const [enteredSize, setEnteredSize] = useState("");
  const [enteredSizeIndex,setEnteredSizeIndex] = useState('')
  const [enteredQty, setEnteredQty] = useState("");
  const [formError, setFormError] = useState(false);

 

  let productColorArray;

  if (product && product.colors) {
    productColorArray = [...product.colors];
    productColorArray.unshift({ color: "select one" });
  }
  let sizeArray;

  if (size && size.sizes) {
    sizeArray = size.sizes.map(s=>s.size);
    sizeArray.unshift("select one");
    // console.log("sizeArra", sizeArray);
  }



  let productSizeType;

  if(product && product.sizeType ){
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
  };

  const sizeChangeHandler = (e) => {
    if (e.target.value === "select one") {
      return;
    }

    setEnteredSize(e.target.value);
    setEnteredSizeIndex(size.sizes.find(s=>s.size === e.target.value ).sizeIndex)
    // console.log('find size index', size.sizes.find(s=>s.size === e.target.value ).sizeIndex)
  };

  const qtyChangeHandler = (e) => {
    setEnteredQty(e.target.value);
  };

  const formSubmitHanlder = (e) => {
    e.preventDefault();

    if (!enteredColor || !enteredSize || !enteredQty) {
      setFormError(true);
      return
    }

    const newSku = {
      color: enteredColor,
      size: enteredSize,
      sizeIndex:enteredSizeIndex,
      qty: enteredQty,
    };


    const skuObj = {
        id:product._id,
        sku:newSku
    }

    dispatch(addSku(skuObj))

  
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
        </div>
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
        {skuStatus ==='loading' && <Loader/>}
        {skuError && <p className="p">{skuError}</p>}
        {skuResult && <p className="p"> the sku added and total number of product is {skuResult}</p>}
     
      </form>
    </div>
  );
}

// slect category and name to get product //

export default AddSku;
