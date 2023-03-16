import React from 'react';
import classes from './HomeCollections.module.css';
import {Link} from 'react-router-dom'
import uuid from "react-uuid";
import HomeCollCard from './HomeCollCard';
import { homeProducts } from '../../../utils/productCategory';

// const homeProducts = [
//   {
//     category:'t shirt',
//     image:"./images/r5.webp"
//   },
//   {
//     category:'shirt',
//     image:"./images/r6.webp"
//   },
//    {
//     category:'jacket',
//     image:"./images/r7.webp"
//   },
// ]


function HomeCollections() {
  return (
    <div className={classes.collections__wrapper}>
        <h2 className={classes.collection__heading}>Treding Collections</h2>
        <div className={classes.collections}>

            {
              homeProducts.map(pr=>{
                return(
                  <HomeCollCard coll={pr} key={uuid()} />
                  
                //   <Link to={`/products?category=${pr.category}`} key={uuid()}>
                //   <div className={classes.card} key={uuid()}>
                //   <div className={ classes.card__image}>
                //       <img src={pr.image} alt="" />
                //   </div>
                //   <div className={classes.card__heading}>
                //       <p > {pr.category} </p>
                //   </div>
                // </div>
                // </Link>
                )
              })
            }
        </div>
       
    </div>
  )
}

export default HomeCollections
