import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import uuid from "react-uuid";

import classes from "./AddProduct.module.css";
import useInput from "../../../hooks/use-input";

import {
  category,
  sizes,
  getCategoryStatus,
  getCategoryError,
  fetchCategory,
  fetchSizes,
} from "../../../reduxStore/adminProduct/categoryAndSizeSlice";

import {addProduct,addedProduct,getAddedProductStatus,getAddedProductError} from '../../../reduxStore/adminProduct/adminProductSlice'

import Loader from "../../../utils/Loader";

function AddProduct() {
  const dispatch = useDispatch();
  const getCategory = useSelector(category);
  const getSize = useSelector(sizes);
  const categoryStats = useSelector(getCategoryStatus);
  const categoryError = useSelector(getCategoryError);

  const prAdded = useSelector(addedProduct);
  const prStats = useSelector(getAddedProductStatus);
  const prError = useSelector(getAddedProductError);

  
 

 
  let getSizeArray
  if(getSize){
   

   getSizeArray = [...getSize];
   getSizeArray.unshift({sizeName:'select one'})
  }


  let getCategoryArray
  if(getCategory){
     getCategoryArray = [...getCategory];
     getCategoryArray.unshift({category:'select one'})
  }




  const [enteredCategory, setenteredCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [enteredSize, setEnteredSize] = useState("");
  const [sizeDisplay, setSizeDisplay] = useState("");
  const [sizeId,setSizeId] = useState('');
  const [formError,setFormError] = useState(false)
//   console.log(
//     "category",
//     getCategory.map((cat) => cat.category)
//   );
//   console.log("size", getSize.map(s=>s.sizeName));
//   console.log("status", categoryStats);
//   console.log("error", categoryError);



 

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchSizes());
  }, []);


  const handleCoverImage = (e) => {
    const imageFile = e.target.files[0];

    // console.log(imageFile);
    tranformFile(imageFile);
  };
  // console.log(coverImage)
  function tranformFile(file) {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
    } else {
      setCoverImage("");
    }
  }
  
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHanlder: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredBrand,
    isValid: enteredBrandIsValid,
    hasError: brandInputHasError,
    valueChangeHandler: brandChangeHandler,
    inputBlurHanlder: brandBlurHandler,
    reset: resetBrandInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHanlder: descriptionBlurHandler,
    reset: resetDescriptionInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPrice,
    isValid: enteredPriceIsValid,   
    hasError: priceInputHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHanlder: priceBlurHandler,
    reset: resetPriceInput,
  } = useInput((value) => value > 0);
  
  const categoryChangeHandler = (e) => {
    if(e.target.value === 'select one'){{
        return
    }}
    setenteredCategory(e.target.value);
  };
  const sizeChangeHandler = (e) => {
    if(e.target.value === 'select one'){{
        return
    }}

    

    setEnteredSize(e.target.value);

    
   setSizeDisplay(getSize.filter((s) => s.sizeName === e.target.value)[0].sizes.map(s=>s.size));
    // sizesArray.filter(s=> s.sizeName === 'size two')
    // setSizeDisplay(getSize.filter((s) => s.sizeName === e.target.value));
    setSizeId(getSize.filter((s) => s.sizeName === e.target.value)[0]._id)

  };
 
  const formSubmitHanlder = (e) => {
      e.preventDefault()
    if(!enteredCategory || !enteredName || !coverImage || !enteredBrand ||!enteredDescription || 
        !enteredPrice || !sizeId){
          
          setFormError(true)
          return
        }

    
       const newProduct = {
        category:enteredCategory,
        name:enteredName,
        coverImage:coverImage,
        brand:enteredBrand,
        description:enteredDescription,
        price:enteredPrice,
        sizeType:sizeId,
       };

        dispatch(addProduct(newProduct))

       setFormError(false)
      //  console.log('new product', newProduct)
     

  };



  const nameInputClass = !nameInputHasError
  ? "form-controller"
  : "form-controller__invalid";

  const brandInputClass = !brandInputHasError
  ? "form-controller"
  : "form-controller__invalid";

  const descriptionInputClass = !descriptionInputHasError
  ? "form-controller"
  : "form-controller__invalid";
  const priceInputClass = !priceInputHasError
  ? "form-controller"
  : "form-controller__invalid";


  // error message must make
  return (
    <div className={classes.wrapper}>
      {categoryStats === "loading" && <Loader />}
      {prStats === "loading" && <Loader />}
      {prStats !== 'loading' &&
       
       <form className={classes.form} onSubmit={formSubmitHanlder}>
       <div className={classes.form__div}>
         <label>
           Category:
           <select onChange={categoryChangeHandler} value={enteredCategory} >
      
             {  getCategoryArray && getCategoryArray.map((cat) => (
              
               <option key={uuid()} value={cat.category} >
                 {cat.category}
               </option>
             ))}
            
           </select>
         </label>
       </div>
       <div className={classes.form__div}>
         <label>
           Name:
           <input
             type="text"
             className={nameInputClass}
             onChange={nameChangeHandler}
             onBlur={nameBlurHandler}
             value={enteredName}
           />
         </label>
       </div>
       {nameInputHasError && <p className="p">invalid name</p>}

       <div className={classes.form__div}>
         <label>
           Brand:
           <input
             type="text"
             className={brandInputClass}
             onChange={brandChangeHandler}
             onBlur={brandBlurHandler}
             value={enteredBrand}
           />
         </label>
       </div>
       {brandInputHasError && <p className="p">invalid brand</p>}
       <div className={classes.form__div}>
         <label>
           size
           <select onChange={sizeChangeHandler} value={enteredSize}>
             {getSizeArray && getSizeArray.map((s) => (
               <option key={uuid()} value={s.sizeName}>
                 {s.sizeName}
               </option>
             ))}
           </select>
         </label>
         {sizeDisplay && <p className="p">{sizeDisplay.map(s=><span className={classes.size__span}>{s}</span>)} </p>}
       </div>
       <div className={classes.form__div}>
         <label>
           CoverImage:
           <input type="file" accept="image/*" onChange={handleCoverImage} />
         </label>
       </div>
       <div className={classes.imagePreview}>
         <img src={coverImage} alt="" />
       </div>
       <div className={classes.form__div}>
         <label>
           Description:
           <br />
           <textarea
             className={classes.text_area}
             placeholder="descriptions here"
           //   className={descriptionInputClass}
             onChange={descriptionChangeHandler}
             onBlur={descriptionBlurHandler}
             value={enteredDescription}
           ></textarea>
         </label>
       </div>
       {descriptionInputHasError && <p className="p">invalid Description</p>}

       <div className={classes.form__div}>
         <label>
            price:
           <input
             type="number"
             className={priceInputClass}
             onChange={priceChangeHandler}
             onBlur={priceBlurHandler}
             value={enteredPrice}
           />
         </label>
       </div>
       {priceInputHasError && <p className="p">invalid MRP</p>}

       <button className="btn_adn">submit</button>
       {formError && <p className="p">all necessary field not completed</p>}
     </form>

      }

     {prAdded &&  prStats !== 'loading' &&
        <div className={classes.pr__block}>
        <div>
          <div className="p_white">id : {prAdded._id}</div>
        </div>
        <div>
          <div className="p_white">category : {prAdded.category}</div>
        </div>
        <div>
          <div className="p_white">name : {prAdded.name}</div>
        </div>
        <div>
           <div>
             {prAdded.coverImage.image &&
               <div className={classes.pr__cover}>
               <img src={prAdded.coverImage.image} alt="" />
             </div>
             }
              
              <div className="p_white">cover image</div>
           </div>
        </div>
        <div>
          <div className="p_white">description : {prAdded.description}</div>
        </div>
        <div>
          <div className="p_white">price : {prAdded.price}</div>
        </div>

    </div>
   
     }
     
      
    </div>
  );
}

export default AddProduct;
