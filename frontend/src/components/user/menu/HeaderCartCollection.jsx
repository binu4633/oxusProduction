import React from 'react';
import classes from './HeaderCartCollection.module.css'
import  {useSelector,useDispatch} from 'react-redux';
import { addToCart,removeFromCart,deleteFromCart } from '../../../reduxStore/user/cartSlice';


function HeaderCartCollection({product}) {
    // const count = useSelector(state=>state.counter.count);
    const dispatch = useDispatch();
  //  console.log('product', product)

const incrementHandler = ()=>{
  dispatch(addToCart({
    _id:product._id,
    sku:product.sku,
    image:product.image1,
    name:product.name,
    price:product.price
  }))
}
const decrementHandler = ()=>{

//   console.log('removing cart', )

  dispatch(removeFromCart({
    sku:product.sku
  }))
}
const deleteHandler = ()=>{
  dispatch(deleteFromCart({
    sku:product.sku
  }))
}
// console.log('type', typeof(product.price))
// console.log('type', typeof(product.discount))
// console.log('type', product.discount)
  return (
    <div className={classes.cart_collection}>
    <div className={classes.product}>
      <div className={classes.product_image}>
        <img src={product.image} alt="" />
      </div>
      <div className={classes.product_name}>
        <p className={classes.name}>{product.category}</p>
        <p className={classes.name}>{product.name}</p>
        <p className={classes.name}>size : {product.size}</p>
        <p className={classes.name}>{product.price} x {product.quantity} </p>
      </div>
    </div>  
    <div className={classes.quantity}>
    
      <div>
        <button className={classes.btn} 
    
        onClick={incrementHandler}
      
         >+</button>
      </div>
      <div>
        <button className={classes.btn}
       
        onClick={decrementHandler}
        >-</button>
      </div>
      <div>
        <button className={classes.btn}
        onClick={deleteHandler}
        >x</button>
      </div>
    </div>
    <div className={classes.total}>
      <p>{product.totalPrice}</p>
    </div>
  </div>
  )
}

export default HeaderCartCollection
