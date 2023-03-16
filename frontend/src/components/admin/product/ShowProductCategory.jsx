import React,{useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import classes from "./AddProductBase.module.css";
import Loader from "../../../utils/Loader";
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
function ShowProductCategory() {
    const dispatch = useDispatch();
    const catagories = useSelector(category);
    const [showCategory, setShowCategory] = useState(false);
    const showCategoryHandler = () => {
        setShowCategory(!showCategory);
      };
      const fetchCategoryHandler = () => {
        dispatch(fetchCategory());
      };
      
      const categoryDeleteHanlder = async(id)=>{
        // console.log('cat id',id);
       const response = await dispatch(deleteCategory(id));
      
       if(response.payload.status === 'success'){
        dispatch(fetchCategory());
       }
      }
  return (
    <div>
       <div>
     <div className={classes.menu__btn_block}>
        <button onClick={showCategoryHandler} className={classes.btn__menu}>
          <p className="p">
            {showCategory ? "hide category" : "show category"}
          </p>{" "}
        </button>
        </div>

        {showCategory && (
          <div className={classes.block}>
            <button className="btn_adn" onClick={fetchCategoryHandler}>
              fetch category
            </button>

            {catagories &&
              catagories.map((cat) => {
                return (
                  <div key={cat._id} className={classes.delete__cat}>
                    <span  className="p">{cat.category}</span>
                    <span className="p">
                      <button onClick={categoryDeleteHanlder.bind(this,cat._id)}>X</button>
                    </span>
                  </div>
                );
              })}
          </div>
        )}

    
      </div>
    </div>
  )
}

export default ShowProductCategory
