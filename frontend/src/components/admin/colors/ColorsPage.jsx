import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  category,
  sizes,
  getCategoryStatus,
  getCategoryError,
  fetchCategory,
  fetchSizes,
} from "../../../reduxStore/adminProduct/categoryAndSizeSlice";
import {
  findProductNames,
  productNames,
  getUtalityStatus,
  getUtalityError,
  findProduct,
  product
} from "../../../reduxStore/adminProduct/productUtils";

import classes from "./ColorPage.module.css";
import Loader from "../../../utils/Loader";
import AddColors from "./AddColors";
import EditColors from "./EditColors";
import DeleteColors from "./DeleteColors";

function ColorsPage() {
  const dispatch = useDispatch();
  const getCategory = useSelector(category);
  const getSize = useSelector(sizes);
  const categoryStats = useSelector(getCategoryStatus);
  const categoryError = useSelector(getCategoryError);

  const names = useSelector(productNames);
  const utilStatus = useSelector(getUtalityStatus);
  const utilsError = useSelector(getUtalityError);

  const getProduct = useSelector(product);





  let newCategoryArray;

  if(getCategory){
    newCategoryArray = [...getCategory]
    newCategoryArray.unshift({category:'select one', _id:789})
  }

  let newNameArray ;
  if(names){
    newNameArray = [...names]
    newNameArray.unshift({name:'select one',_id:963})
  }



  const [enteredCategory, setenteredCategory] = useState("");
  const [enteredName, setenteredName] = useState("");
  const [productId,setProductId] = useState(getProduct && getProduct.length >0 ? getProduct[0]._id:'');

  const [addColors,setAddColors] = useState(false);
  const [editColors,setEditColors] = useState(false);
  const [deleteColors,setDeleteColors] = useState(false);

  const fetchCategoryHandler = ()=>{
    dispatch(fetchCategory());
  }

//   useEffect(() => {
//     dispatch(fetchCategory());
//   }, []);



  const categoryChangeHandler = (e) => {
    if(e.target.value ==='select one'){
       return
    }
    setenteredCategory(e.target.value);
    dispatch(findProductNames({ category: e.target.value }));
  };

  const nameChangeHandler = (e) => {
    if(e.target.value === 'select one'){
        return
    }
    setenteredName(e.target.value);
     dispatch(findProduct({category:enteredCategory,name:e.target.value}))

  };

const addColorHandler = ()=>{
  setAddColors(true);
  setDeleteColors(false);
  setEditColors(false);
}

const editColorHandler = ()=>{
  setEditColors(true);
  setAddColors(false);
  setDeleteColors(false);
}

const deleteColorHandler = ()=>{
    setDeleteColors(true);
    setEditColors(false);
    setAddColors(false);
}

  return (
    <div className={classes.wrapper}>
        <button className='btn_adn' onClick={fetchCategoryHandler}>fetch category </button>
      {categoryError && <p className="p">{categoryError}</p>}
      {getCategory && getCategory.length > 0 && (
        <div>
          <label>
            Category:
            <select onChange={categoryChangeHandler} value={enteredCategory}>
              {newCategoryArray && newCategoryArray.map((cat) => (
                <option key={cat._id} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
          </label>
          {utilsError && <p className="p">{utilsError}</p>}
          {names && names.length === 0 && (
            <p className="p">No products in this category</p>
          )}
        </div>
      )}
      {names && names.length > 0 && (
        <div>
          <label>
            Name:
            <select onChange={nameChangeHandler} value={enteredName}>
              {newNameArray.map((nam) => (
                <option key={nam._id} value={nam.name}>
                  {nam.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
      {getProduct && getProduct.length >0 &&
         <div className={classes.productDisplay}>
         <p className="p">{getProduct[0].category}</p>
         <p className="p">{getProduct[0].name}</p>
       
       <button className="btn_adn" onClick={addColorHandler}>Add colors</button>
       <button className="btn_adn" onClick={editColorHandler}>Edit colors</button>
       <button className="btn_adn" onClick={deleteColorHandler}>Delete colors</button>

      {addColors && <AddColors id={getProduct[0]._id} />}
      {editColors && <EditColors id={getProduct[0]._id} colors={getProduct[0].colors} />}
      {deleteColors && <DeleteColors id={getProduct[0]._id} colors={getProduct[0].colors} />}
     </div>
      }
    
    </div>
  );
}

export default ColorsPage;
