import React,{useState,useEffect} from 'react'

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

  import classes from './sku.module.css';

import AddSku from './AddSku';
import UpdateSku from './UpdateSku';
import DeleteSku from './DeleteSku';

function Sku() {

    const dispatch = useDispatch();
    const getCategory = useSelector(category);
    const getSize = useSelector(sizes);
    const categoryStats = useSelector(getCategoryStatus);
    const categoryError = useSelector(getCategoryError);
  
    const names = useSelector(productNames);
    const utilStatus = useSelector(getUtalityStatus);
    const utilsError = useSelector(getUtalityError);
  
    const getProduct = useSelector(product);
  
  

    const [enteredCategory, setenteredCategory] = useState("");
    const [enteredName, setenteredName] = useState("");

    const [skuAdd,setSkuAdd] = useState(false);
    const [skuUpdate,setSkuUpdate] = useState(false);
    const [skuDelete,setSkuDelete] = useState(false)
  
  
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
  
   

    const fetchCategoryHandler = ()=>{
        dispatch(fetchCategory());
    }
    // useEffect(() => {
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
   
 

 const addSkuHandler = ()=>{
    setSkuAdd(true)
    setSkuUpdate(false)
    setSkuDelete(false)
 }

 const updateSkuHandler = ()=>{
    setSkuUpdate(true)
    setSkuAdd(false)
    setSkuDelete(false)
 }
 const deleteSkuHandler = ()=>{
    setSkuUpdate(false)
    setSkuAdd(false)
    setSkuDelete(true)
 }

  return (
    <div>
       <p className="p">Stock keeping unit</p>

       <div className={classes.wrapper}>

        <button className="btn_adn" onClick={fetchCategoryHandler}> fetch category </button>

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
     
    
   
   </div>

    }
    </div>

       <div className={classes.btn_group}>
        <button className="btn_adn" onClick={addSkuHandler}>add sku</button>
        <button className="btn_adn" onClick={updateSkuHandler}>update sku</button>
        <button className="btn_adn" onClick={deleteSkuHandler}>delete sku</button>
       </div>
      
      {skuAdd && <AddSku product={getProduct[0]} />}
      {skuUpdate && <UpdateSku  product={getProduct[0]} />}
      {skuDelete && <DeleteSku  product={getProduct[0]} />}

    </div>
  )
}

export default Sku
