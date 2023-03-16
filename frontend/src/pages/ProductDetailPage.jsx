import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {fetchProductDetail,productDetail,productStatus,productsError} from '../reduxStore/user/fetchProductDetailSlice'
import {fetchImages} from '../reduxStore/user/slideImageSlice'
import {useParams} from 'react-router-dom';
import Slider from '../utils/Slider';

import classes from './ProductDetail.module.css';
import ProductDetailContent from '../components/user/productDetail/ProductDetailContent';
import Loader from '../utils/Loader';

function ProductDetailPage() {
const params = useParams();
const dispatch = useDispatch();
const product = useSelector(productDetail);
const status = useSelector(productStatus);
const error = useSelector(productsError);





useEffect(()=>{
 
   dispatch(fetchProductDetail(params.id));

  //  if(status === "succeeded"){
  //   // if(product && product.colors.length >0){
  //   // const imageId = product.colors[0].imageCollection
  //   //     dispatch(fetchImages(imageId))
       
  //   // }

  //  }


},[])

// let imageId 
//  if(status === "succeeded"){
//   if(product && product.colors.length >0){
//     imageId = product.colors[0].imageCollection
//       dispatch(fetchImages(imageId))
     
//   }
//  }

 useEffect(()=>{



 if(status === "succeeded"){
  if(product && product.colors.length >0){
   const imageId = product.colors[0].imageCollection
      dispatch(fetchImages(imageId))
     
  }
 }
 },[status === 'succeeded',product])

  return (
    <div style={{paddingTop:'10rem', backgroundColor: 'var(--bg-1)',minHeight:'100vh'}}>

     {status ==='loading' && <Loader/>}

        {!product && status !=='loading' &&
          <div>
            <p className="p_white">please refresh the page to find product</p>
          </div>
        }
       {product && status !=='loading' &&
       <div className={classes.wrapper}>
        {/* <div> */}
          <Slider />
        {/* </div> */}
        {/* <div> */}
         <ProductDetailContent  />
        {/* </div> */}
       </div>
     }
     {
       error && <p className="p">{error}</p>
     }
    </div>
  )
}

export default ProductDetailPage
