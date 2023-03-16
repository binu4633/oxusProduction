import React from 'react';
import uuid from "react-uuid";
import { useSelector, useDispatch } from "react-redux";
import {Link} from 'react-router-dom'
import classes from './ProductCollection.module.css';
import {prCollection,collectionStatus,colletionError} from '../../../reduxStore/adminProduct/productCollectionSlice'

function ProductCollection() {

    const products = useSelector(prCollection);
    const status = useSelector(collectionStatus);
    const error = useSelector(colletionError);


const style = {
  textDecoration:'none',
  color:'white'
}


  return (
    <div className={classes.wrapper} >
      <table className={classes.table}>
       <thead className={classes.thead}>
       <tr>
        <th>category</th>
        <th>name</th>
        <th>price</th>
        <th>discount</th>
        <th>Qty</th>
        <th>active</th>
        <th>view/edit</th>
       
       </tr>
       </thead>
       <tbody className={classes.tbody}>
      
       {products && products.map(pr=>{
     
        return(
            <tr key={uuid()}>
            <td>{pr.category}</td>
            <td>{pr.name}</td>
            <td>{pr.price}</td>
            <td>{pr.discount}</td>
            <td>{pr.productStockCount}</td>
            <td>{pr.publish.toString()}</td>
            {/* <td><button onClick={productViewHandler.bind(this,pr._id)}>view</button></td> */}
            <td><Link to={`/auth/admin/product/productDetail/${pr._id}`} style={style}>view/edit</Link></td>
          
           </tr>
        )
       })
       
       }
       </tbody>
      </table>
    </div>
  )
}

export default ProductCollection
