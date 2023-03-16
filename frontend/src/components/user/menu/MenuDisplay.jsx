import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import uuid from "react-uuid";
import { homeProducts } from '../../../utils/productCategory';
import {fetchProducts} from '../../../reduxStore/user/fetchProductsSlice';
import {toggleMenu} from '../../../reduxStore/user/uiSlice';
import {addSearchKeyword} from '../../../reduxStore/user/uiSlice'
import classes from './MenuDisplay.module.css';
function MenuDisplay() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const menu = useSelector(state=>state.ui.menu);
    // console.log('menu',menu);
    // console.log('home products',homeProducts)

    const onLinkHandler = (cat)=>{
        const query = `?category=${cat}`;
        dispatch(fetchProducts(query));
        dispatch(addSearchKeyword(query))
        navigate("/products");
        dispatch(toggleMenu())
    }

  return (
    <div className={classes.wrapper} style={{clipPath: !menu ? "polygon(50% 0, 50% 0%, 50% 100%, 50% 100%)" :"polygon(0 0, 100% 0, 100% 100%, 0 109%)"}}>
      {homeProducts.map(pr=>{
        return(
            <div key={uuid()}>
        <button className={classes.btn__link} onClick={onLinkHandler.bind(this,pr.category)}>
          {pr.category}
       
      </button>
      </div>
        )
       
      })}

    </div>
  )
}

export default MenuDisplay
