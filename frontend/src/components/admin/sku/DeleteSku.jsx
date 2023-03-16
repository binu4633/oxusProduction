import React, { useState } from "react";
import uuid from "react-uuid";
import classes from "./DeleteSku.module.css";
import { useSelector, useDispatch } from "react-redux";

import {deleteSku,deletedResult,getSkuStatus,getSkuDeleteError} from '../../../reduxStore/adminProduct/skuSlice'
import Loader from "../../../utils/Loader";
function DeleteSku({ product }) {


  const dispatch = useDispatch();

  const result = useSelector(deletedResult);
  const stats = useSelector(getSkuStatus);
  const error = useSelector(getSkuDeleteError);


  const [enteredColor, setEnteredColor] = useState("");

  let productColorArray;

  if (product && product.colors) {
    productColorArray = [...product.colors];
    productColorArray.unshift({ color: "select one" });
  }

  let sizeArray;

  if (product && product.sku) {
    sizeArray = product.sku.filter((pr) => pr.color === enteredColor);
    //   .map((pr) => pr.size);
   
   
  }

  const colorChangeHandler = (e) => {
    if (e.target.value === "select one") {
      return;
    }

    setEnteredColor(e.target.value);
  };



  const skuDeleteHandler = (skuId)=>{
   
const skuObj = {
    id:product._id,
    skuid:skuId
}

    dispatch(deleteSku(skuObj))

  }

  return (
    <div className={classes.wrapper}>
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
        {result && <p className="p">{result}</p>} 
        {error && <p className="p">{error}</p>} 
        {stats === 'loading' && <Loader/>}
      {
        sizeArray && sizeArray.map(pr=>{
            return(
                <div className={classes.clr_box}>
                <p className="p">color : {pr.color}</p>
                <p className="p">Size : {pr.size}</p>
                <p className="p">quantity :{pr.qty}</p>
        
                <button className="btn_adn" onClick={skuDeleteHandler.bind(this,pr.sku)}>delete</button>
              </div>
            )
        })
      }

   
      
    </div>
  );
}

export default DeleteSku;
