import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import classes from "./AddColors.module.css";
import Loader from "../../../utils/Loader";
import {addColors,getadminColorStatus,getAdminColorError,addColorResult} from '../../../reduxStore/adminProduct/adminColorsSlice'
function AddColors({ id }) {
const dispatch = useDispatch();

const actionStatus = useSelector(getadminColorStatus);
const actionError = useSelector(getAdminColorError);
const actionResult = useSelector(addColorResult);

// console.log('stats',actionStatus );
// console.log('result',actionResult);
// console.log('error',actionError)

  const [enteredColor,setEnteredColor] = useState('')
  const [colorImage, setColorImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");

  const [formError,setFormError] = useState(false);

  // console.log(coverImage)
  function tranformFile(file, setCover) {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setCover(reader.result);
      };
    } else {
      // setCoverImage("");
      return "";
    }
  }

  const handleColorImage = (e) => {
    const imageFile = e.target.files[0];

    tranformFile(imageFile, setColorImage);
  };
  const handleCoverImage = (e) => {
    const imageFile = e.target.files[0];

    tranformFile(imageFile, setCoverImage);
  };

  const handleImage1 = (e)=>{
    const imageFile = e.target.files[0];

    tranformFile(imageFile, setImage1);
  }
  const handleImage2 = (e)=>{
    const imageFile = e.target.files[0];

    tranformFile(imageFile, setImage2);
  }
  const handleImage3 = (e)=>{
    const imageFile = e.target.files[0];

    tranformFile(imageFile, setImage3);
  }
  const handleImage4 = (e)=>{
    const imageFile = e.target.files[0];

    tranformFile(imageFile, setImage4);
  }
  const handleImage5 = (e)=>{
    const imageFile = e.target.files[0];

    tranformFile(imageFile, setImage5);
  }

 const colorChangeHandler = (e)=>{
  setEnteredColor(e.target.value)
 }

const onDeleteColorImage = ()=>{
  setColorImage('')
}
  const formSubmitHandler = (e)=>{
   e.preventDefault();
  //  
   if(coverImage === '' ||image1 === '' || image2 === '' || image3 === '' ||image4 === '' ||image5 === ''|| enteredColor===''){
    setFormError(true);
    return
   }
   
   const  colorObj = {
    color:enteredColor,
    colorImage,
    coverImage,
    image1,
    image2,
    image3,
    image4,
    image5
   }

  

   dispatch(addColors({id,colorObj}));

   setEnteredColor('')
   setCoverImage('');
   setImage1('')
   setImage2('')
   setImage3('')
   setImage4('')
   setImage5('')
  }

  return (
    <div>
      <h4>add colors</h4>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <div>
          <label>
            color:
            <input type="text"  onChange={colorChangeHandler} value={enteredColor}/>
          </label>
        </div>
        <div className={classes.imageBlock}>
          <div>
            <label>
              ColorImage:
              <input type="file" accept="image/*" onChange={handleColorImage} />
            </label>
            <div>
            <button onClick={onDeleteColorImage}>delete color image</button>
          </div>
          </div>
       
          <div className={classes.imagePreview}>
            <img src={colorImage} alt="" />
          </div>
        </div>
        <div className={classes.imageBlock}>
          <div>
            <label>
              CoverImage:
              <input type="file" accept="image/*" onChange={handleCoverImage} />
            </label>
          </div>

          <div className={classes.imagePreview}>
            <img src={coverImage} alt="" />
          </div>
        </div>
        <div className={classes.imageBlock}>
          <div>
            <label>
              image1:
              <input type="file" accept="image/*" onChange={handleImage1} />
            </label>
          </div>
          <div className={classes.imagePreview}>
            <img src={image1} alt="" />
          </div>
        </div>
        <div className={classes.imageBlock}>
          <div>
            <label>
              image2:
              <input type="file" accept="image/*" onChange={handleImage2} />
            </label>
          </div>
          <div className={classes.imagePreview}>
            <img src={image2} alt="" />
          </div>
        </div>
        <div className={classes.imageBlock}>
          <div>
            <label>
              image3:
              <input type="file" accept="image/*" onChange={handleImage3} />
            </label>
          </div>
          <div className={classes.imagePreview}>
            <img src={image3} alt="" />
          </div>
        </div>
        <div className={classes.imageBlock}>
          <div>
            <label>
              image4:
              <input type="file" accept="image/*" onChange={handleImage4} />
            </label>
          </div>
          <div className={classes.imagePreview}>
            <img src={image4} alt="" />
          </div>
        </div>
        <div className={classes.imageBlock}>
          <div>
            <label>
              image5:
              <input type="file" accept="image/*" onChange={handleImage5} />
            </label>
          </div>
          <div className={classes.imagePreview}>
            <img src={image5} alt="" />
          </div>
        </div>
        <button>submit</button>
        {formError && <p className="p"> all the image field must be filled </p>}
        {actionStatus ==='loading' && <Loader />}
         {actionResult && <p className="p">{actionResult}</p>} 
         {actionError && <p className="p">{actionError}</p>} 
      </form>
      
    </div>
  );
}

export default AddColors;
