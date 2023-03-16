import React from 'react'
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {fetchProducts} from '../../../reduxStore/user/fetchProductsSlice';
import {addSearchKeyword} from '../../../reduxStore/user/uiSlice'
import classes from './HomeCollCard.module.css';
function HomeCollCard({coll}) {

   const dispatch = useDispatch()
   const navigate = useNavigate();
   const onProductsHandler = (cat)=>{
        const query = `?category=${cat}`;
        dispatch(fetchProducts(query));
        dispatch(addSearchKeyword(query))
        navigate("/products");
   }

  return (
   //  <Link to={`/products?category=${coll.category}`} >
   <button className={classes.btn_link} onClick={onProductsHandler.bind(this,coll.category)}>

    <div className={classes.card__wrapper}>
    <div className={classes.card}>
       <div className={classes.card__outline}></div>
       <div className={classes.card__img}>
          <img src={coll.image} alt="" />
       </div>
       <div className={classes.card__heading}>
          <h2>{coll.category}</h2>
       </div>
    </div>
   </div>
   
   </button>
//  </Link>
  )
}

export default HomeCollCard
