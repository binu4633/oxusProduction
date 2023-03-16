import React, { useState } from "react";
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

function AddProductCategory() {
    const dispatch = useDispatch();

    const actionStatus = useSelector(getCategoryStatus);
    const actionError = useSelector(getCategoryError);
    const postCategory = useSelector(addedcategory);
  const [addCategoryDisplay, setAddCategoryDisplay] = useState(false);
  const [enteredCatagory, setEnteredCategory] = useState("");
  const [enteredCategoryError,setEntedCategoryError] = useState(false);
  const [isCategorySubmit,setIsCategorySubmit] = useState(false);
  const showAddCategoryHandler = () => {
    setAddCategoryDisplay(!addCategoryDisplay);
  };

  const catagoryChangeHandler = (e) => {
    setIsCategorySubmit(false);
    setEnteredCategory(e.target.value);
  };
  const categoryFocusHandler = () => {
    setEntedCategoryError(false);
  };
  const catagorySubmitHandler = (e) => {
    e.preventDefault();

    if (enteredCatagory === "") {
      setEntedCategoryError(true);
      return;
    }

    dispatch(
      addCategory({
        category: enteredCatagory,
      })
    );
    setIsCategorySubmit(true);
  
    setEnteredCategory("");
  };

  return (
    <div>
      <div className={classes.menu__btn_block}>
        <button onClick={showAddCategoryHandler} className={classes.btn__menu}>
          <p className="p">
            {addCategoryDisplay ? "hide addCategory" : "show addCategory"}
          </p>{" "}
        </button>
      </div>
      {actionStatus === "loading" && <Loader />}
      

      {addCategoryDisplay && (
        <div className={classes.block}>
          <form onSubmit={catagorySubmitHandler}>
            <div className={classes.form_div}>
              <label>
                category:
                <input
                  type="text"
                  className={classes.input__text}
                  onChange={catagoryChangeHandler}
                  //   onBlur={nameBlurHandler}
                  value={enteredCatagory}
                  onFocus={categoryFocusHandler}
                />
              </label>
            </div>
            <button className="btn_adn">Add</button>
          </form>
          {enteredCategoryError && (
            <p className="p">the field cannot be empty</p>
          )}
          {isCategorySubmit && actionStatus === "succeeded" && postCategory && (
            <p className="p">
              the `{postCategory.category}` added to the data base
            </p>
          )}
          {isCategorySubmit && actionError && (
            <p className="p">{actionError}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default AddProductCategory;
