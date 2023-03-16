import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
function AddProductSize() {
    const dispatch = useDispatch();
    const postSize = useSelector(addedsizes);
    const actionStatus = useSelector(getCategoryStatus);
    const actionError = useSelector(getCategoryError);
  const [addSizeDisplay, setAddSizeDisplay] = useState(false);

  const [enteredSizeName, setEnteredSizeName] = useState("");
  const [enteredSizes, setEnteredSizes] = useState("");

  const [enteredSizeError, setEntedSizeError] = useState(false);

  const [isSizeSubmit, setIsSizeSubmit] = useState(false);

  let splitSize;

  const showAddSizeHandler = () => {
    setAddSizeDisplay(!addSizeDisplay);
  };

  const sizeNameChangeHandler = (e) => {
    setEnteredSizeName(e.target.value);
  };

  const sizesChangeHandler = (e) => {
    setEnteredSizes(e.target.value);
  };
  const sizeFocusHandler = () => {
    setEntedSizeError(false);
  };
  const sizeSubmitHanlder = (e) => {
    e.preventDefault();

    if (enteredSizeName === "" || enteredSizes === "") {
      setEntedSizeError(true);
      return;
    }

    // splitSize = enteredSizes.split(',')

    // console.log(enteredSizes)
    // console.log(splitSize)
    dispatch(
      addSizes({
        sizeName: enteredSizeName,
        sizes: enteredSizes,
      })
    );
    setIsSizeSubmit(true);
    setEnteredSizeName("");
    setEnteredSizes("");
  };
  return (
    <div>
      <div className={classes.menu__btn_block}>
        <button onClick={showAddSizeHandler} className={classes.btn__menu}>
          <p className="p">{addSizeDisplay ? "hide add size" : "add size"}</p>{" "}
        </button>
      </div>

      {/* size optins */}
      {addSizeDisplay && (
        <div className={classes.block}>
          <form onSubmit={sizeSubmitHanlder} className={classes.form_div}>
            <label>
              size name:
              <input
                type="text"
                className={classes.input__text}
                onChange={sizeNameChangeHandler}
                //   onBlur={nameBlurHandler}
                value={enteredSizeName}
                onFocus={sizeFocusHandler}
              />
            </label>
            <br />
            <label>
              sizes:
              <input
                type="text"
                className={classes.input__text}
                onChange={sizesChangeHandler}
                //   onBlur={nameBlurHandler}
                value={enteredSizes}
                onFocus={sizeFocusHandler}
              />
            </label>
            <br />
            <button className="btn_adn">add</button>
            <p className="p">Add comma seperated value like M,S etc</p>
          </form>
          {enteredSizeError && <p className="p">the field cannot be empty</p>}
          {isSizeSubmit && actionStatus === "succeeded" && postSize && (
            <p className="p">
              the `{postSize.sizeName}` added to the data base
            </p>
          )}
          {isSizeSubmit && actionError && <p className="p">{actionError}</p>}
        </div>
      )}
    </div>
  );
}

export default AddProductSize;
