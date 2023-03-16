import React, { useState,useEffect } from "react";
import uuid from "react-uuid";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  productDetail,
  productStatus,
  productsError,
} from "../../../reduxStore/user/fetchProductDetailSlice";
import { fetchImages } from "../../../reduxStore/user/slideImageSlice";
import { addToCart } from "../../../reduxStore/user/cartSlice";
import {sizeChartDisplay} from '../../../reduxStore/user/uiSlice'
import classes from "./ProductDetailContent.module.css";
import Loader from "../../../utils/Loader";
function ProductDetailContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(productDetail);
  const stats = useSelector(productStatus);
  const error = useSelector(productsError);



  const [sizeArrayState, setSizeArrayState] = useState("");
  const [sizeState, setSizeState] = useState("");
  const [colorState, setColorState] = useState("");
  const [enteredSku, setEnteredSku] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const [colorError, setColorError] = useState(false);



  const colorClickHandler = (color) => {
    // console.log('clllr',);
    const colorId = product.colors.find(
      (pr) => pr.color === color
    ).imageCollection;

    dispatch(fetchImages(colorId));
    setColorState(color);
    const sizeArray = product.sku
      .filter((pr) => pr.color === color)
      .sort((a, b) => a.sizeIndex - b.sizeIndex)
      .map((pr) => pr.size);
    setSizeArrayState(sizeArray);
  };

  useEffect(()=>{
    if(product &&product.colors && product.colors.length > 0 )
    colorClickHandler(product.colors[0].color)
  
  },[])


  const bg1 = {
    backgroundColor: "olive",
  };
  const bg2 = {
    backgroundColor: "rgba(95, 60, 26, 1)",
  };
  const cl1 = {
    tranform: "scale(1.2)",
  };
  const cl2 = {
    tranform: "scale(1)",
  };

  const sizeSelectHandler = (s) => {

    setSizeState(s);
    const sku = product.sku.filter(
      (pr) => pr.color === colorState && pr.size === s
    )[0].sku;

    setEnteredSku(sku);
  };

  const addToCartHandler = () => {
    if (!sizeState) {
      setSizeError(true);
      return;
    }

    if (!colorState) {
      setColorError(true);
      return;
    }

    const cartObj = {
      productId: product._id,
      name: product.name,
      category: product.category,
      image: product.coverImage.image,
      price: product.price,
      size: sizeState,
      color: colorState,
      sku: enteredSku,
      discount:product.discount
    };

   

    dispatch(addToCart(cartObj));
    setSizeError(false);
    setColorError(false);
  };

  const buyNowHandler = () => {
    if (!sizeState) {
      setSizeError(true);
      return;
    }

    if (!colorState) {
      setColorError(true);
      return;
    }

    const cartObj = {
      productId: product._id,
      name: product.name,
      category: product.category,
      image: product.coverImage.image,
      price: product.price,
      size: sizeState,
      color: colorState,
      sku: enteredSku,
      discount:product.discount
    };

    dispatch(addToCart(cartObj));
    navigate('/product_cart')
  };
  const gotoCartHandler = ()=>{
    navigate('/product_cart')
  }

  const onChartFindHandler = (s)=>{
  
    dispatch(sizeChartDisplay())
  }


  return (
    <>
    {stats === 'loading' && <Loader/>}
    {stats !== 'loading' &&
      <div className={classes.wrapper}>
    
    

      {product && (
        <div className={classes.content__box}>
          <div className={classes.content__text}>
          <p className={classes.category}>{product.category}</p>
            
          <p className={classes.name}>{product.name}</p>
          {product.discount > 0 &&
             <p className={classes.price}> <span>&#8377;{product.price -(product.price*product.discount/100)}</span>
             <span className={classes.discount__banner}>
              <span className={classes.discount_price}>&#8377;{product.price}</span>
             <span> {product.discount}% off</span>
             </span>
             </p>
          }
          {
            product.discount === 0 &&
            <p className={classes.price}> 
             <span >&#8377;{product.price}</span></p>
          }
       
          <div className={classes.description}>

          <p>{product.description}</p>
          </div>
          </div>
         <button className={classes.btn__chart} onClick = {onChartFindHandler.bind(this,product.sizeType)}>size chart</button>
          <div className={classes.color__block}>
            {product &&
              product.colors &&
              product.colors.map((clr) => {
                return (
                  <div
                    className={classes.color__picker}
                    key={uuid()}
                    style={{
                      backgroundColor: clr.color,
                      transition:
                        colorState === clr.color ? "all 0.5s" : "all 0.3s",
                      transform:
                        colorState === clr.color ? "scale(1.1)" : "scale(1)",
                    }}
                    onClick={colorClickHandler.bind(this, clr.color)}
                  ></div>
                );
              })}
          </div>
        </div>
      )}
     
      {sizeArrayState &&
        sizeArrayState.map((s) => {
          return (
            <button
              className={classes.btn__size}
              key={uuid()}
              style={sizeState ? (sizeState === s ? bg1 : bg2) : bg2}
              onClick={sizeSelectHandler.bind(this, s)}
            >
              {s}
            </button>
          );
        })}
         <div className={classes.selected}>
         {colorState && <p>color: {colorState} </p> } 
         {sizeState && <p>size: {sizeState} </p>}  
        
         </div>
      <div>
        </div>  

      {sizeError && <p className="p">please select a size and color</p>}
      {colorError && <p className="p">please select a color</p>}


      <div>
        <button className={classes.add_to_cart} onClick={addToCartHandler}>
          Add to cart
        </button>
      </div>
      <div>
        <button className={classes.add_to_cart} onClick={buyNowHandler}>
          buy now
        </button>
      </div>
      <div>
        <button className={classes.add_to_cart} onClick={gotoCartHandler}>
          Go to Cart
        </button>
      </div>
    </div>
    }
    
    </>
  );
}

export default ProductDetailContent;
