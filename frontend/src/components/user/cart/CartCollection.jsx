import React from 'react';
import classes from './CartCollection.module.css'
import  {useSelector,useDispatch} from 'react-redux';
import { addToCart,removeFromCart,deleteFromCart } from '../../../reduxStore/user/cartSlice';
import deleteIcon from '../../../imageCl/delete.svg'
// import {increment, decrement} from '../../reduxStore/counterSlice'

function CartCollection({product}) {
    // const count = useSelector(state=>state.counter.count);
    const dispatch = useDispatch();

const incrementHandler = ()=>{
  dispatch(addToCart({
    _id:product._id,
    image:product.image1,
    name:product.name,
    price:product.price,
    sku:product.sku
  }))
}
const decrementHandler = ()=>{



  dispatch(removeFromCart({
    sku:product.sku
  }))
}

const deleteHandler = ()=>{
  dispatch(deleteFromCart({
    sku:product.sku
  }))
}
  return (
    <div className={classes.cart_collection}>
    <div className={classes.product}>
      <div className={classes.product_image}>
        <img src={product.image} alt="" />
      </div>
      <div className={classes.product_name}>
        <div>
        <p  className={classes.category}>{product.category}</p> 
        <p className={classes.name}>{product.name}</p>
        </div>
       
        <div className={classes.size__amount__grid}>
          <div className={classes.size__color__box}>
             <p className="p">color : {product.color}</p>
             <p className="p">size : {product.size}</p>
          </div>
          <div className={classes.price__box}>
          <p className={classes.price}>price:{product.price}</p>
          </div>
        </div>
       
      
      </div>
    </div>
    <div className={classes.quantity}>
     
      <div>
        <button className={classes.btn} onClick={incrementHandler}>+</button>
      </div>
      <div>
        <button className={classes.btn} onClick={decrementHandler}>-</button>
      </div>
      <div>
        <button className={classes.btn} onClick={deleteHandler}>
          {/* <i className="fa-solid fa-trash"></i> */}
          <img src={deleteIcon} alt="delete icon" />
        </button>
      </div>
      <div>
        <p className={classes.quantity_num}>{product.quantity}</p>
      </div>
    </div>
    <div className={classes.total}>
      <p>{product.totalPrice}</p>
    </div>
  </div>
  )
}

export default CartCollection
