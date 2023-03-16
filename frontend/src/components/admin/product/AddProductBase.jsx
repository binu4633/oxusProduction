import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import uuid from 'react-uuid';
import classes from "./AddProductBase.module.css";

import {
  category,
  addCategory,
  sizes,
  addSizes,
  addedcategory,
  addedsizes,
  getCategoryStatus,
  getCategoryError,
  fetchCategory,
  deleteCategory,
  fetchSizes,
  updateSizes,
  deleteSizes 
} from "../../../reduxStore/adminProduct/categoryAndSizeSlice";

import AddProductCategory from "./AddProductCategory";
import ShowProductCategory from "./ShowProductCategory";
import AddProductSize from "./AddProductSize";
import ShowProductSize from "./ShowProductSize";

import Loader from "../../../utils/Loader";

function AddproductBase() {
 

 


  // console.log("error", actionError);
  // console.log('sizess',size)

  //   let sizeContent;

  //   if (size.length !== 0) {
  //     console.log("size is false");
  //     console.log("sizes name", size[0].sizeName);
  //     // console.log("sizes size", Array.from( size[0].sizes));
  //     // console.log("sizes size", size[0].sizes.split(','));

  //     sizeContent = size.map((s) => {
  //       return (
  //         <div>
  //           <p className="p">{s.sizeName}</p>
  //           {s.sizes.split(",").map((item) => (
  //             <span className="p">{item}</span>
  //           ))}
  //         </div>
  //       );
  //     });
  //   }

  //   console.log("each s ", sizeContent);




 
//   console.log("show cat on render", showCategory);






  // useEffect(()=>{
  // if(showCategory){
  //     dispatch(fetchCategory())
  // }
  // setShowCategory(false)

  // },[showCategory])

//   console.log("categpries", catagories);




  return (
    <div className={classes.base}>
      {/* <h1>product base add</h1> */}


      <AddProductCategory />
      <ShowProductCategory />
      <AddProductSize />
      <ShowProductSize />
    
      


        {/* display sizes */}
       
        {/* {showSizes && <div>{sizeContent}</div>} */}
      
     
    </div>
  );
}

export default AddproductBase;
