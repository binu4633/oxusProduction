import React from 'react'
import classes from './ProductCard.module.css';
import {Link} from 'react-router-dom'
function ProductCard({product,gridSize}) {
    
  return (
    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
           <div className={gridSize===1?classes.card__1:gridSize ===2?classes.card__2:gridSize===3?classes.card__3:classes.card__5}>
                <div className={classes.card__img}>
                    <img src={product.coverImage.image} alt="" />
                </div>
                <div className={gridSize === 1? classes.card__text__1 : gridSize ===2 ?classes.card__text__2:gridSize===3?classes.card__text__3:classes.card__text__5}>
                    <p className={gridSize ===1 ?classes.category__1:gridSize ===2?classes.category__2:gridSize===3?classes.category__3:classes.category__5}>{product.category}</p>
                    <p className={gridSize ===1 ?classes.name__1:gridSize ===2?classes.name__2:gridSize===3?classes.name__3:classes.name__5}>{product.name}</p>
                    <p className={gridSize ===1 ?classes.price__1:gridSize ===2?classes.price__2:gridSize===3?classes.price__3:classes.price__5}> <span>&#x20B9;{product.price -(product.price*product.discount/100)}</span>
                    {product.discount >0 && <span><span className={classes.discount_price}>{product.price}</span> <span>{`${product.discount}% off`}</span></span>} 
                    </p>
                </div>
            </div>

    {/* <div className={classes.card}>
      <div className={classes.image__box}>
        <img src={product.coverImage.image} alt="" />
      </div>
      <div className={classes.content__box}>
        <p className={classes.category}>{product.category}</p>
        <p className={classes.name}>{product.name}</p>
        <p className={classes.price}> <span>&#x20B9;{product.price -(product.price*product.discount/100)}</span>
        {product.discount >0 && <span><span className={classes.discount_price}>{product.price}</span> <span>{`${product.discount}% off`}</span></span>} 
        </p>
      </div>
    </div> */}
    </Link>
  )
}

export default ProductCard
