import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../utils/Loader";
import classes from "./AddColors.module.css";
import {
  updateColors,
  updateColorResult,
  getUpdateError,
  getadminColorStatus,
} from "../../../reduxStore/adminProduct/adminColorsSlice";
function EditColors({ id, colors }) {
  const dispatch = useDispatch();

 

  const actionStatus = useSelector(getadminColorStatus);
const actionError = useSelector(getUpdateError);
const actionResult = useSelector(updateColorResult,);

// console.log('stats',actionStatus );
// console.log('result',actionResult);
// console.log('error',actionError);

let newColorArray;

if(colors){
    newColorArray = [...colors]
    newColorArray.unshift({color:'select one',_id:123})
}

// console.log('the new color array', newColorArray)

  const [enteredColor, setEnteredColor] = useState("");
  const [enteredUpdateColor, setEnteredUpdateColor] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");

  const [formError, setFormError] = useState(false);

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

  const handleCoverImage = (e) => {
    const imageFile = e.target.files[0];

    tranformFile(imageFile, setCoverImage);
  };

  const handleImage1 = (e) => {
    const imageFile = e.target.files[0];

    tranformFile(imageFile, setImage1);
  };
  const handleImage2 = (e) => {
    const imageFile = e.target.files[0];

    tranformFile(imageFile, setImage2);
  };
  const handleImage3 = (e) => {
    const imageFile = e.target.files[0];

    tranformFile(imageFile, setImage3);
  };
  const handleImage4 = (e) => {
    const imageFile = e.target.files[0];

    tranformFile(imageFile, setImage4);
  };
  const handleImage5 = (e) => {
    const imageFile = e.target.files[0];

    tranformFile(imageFile, setImage5);
  };

  const colorChangeHandler = (e) => {
  if(e.target.value === 'select one'){
    return
  }

    setEnteredColor(e.target.value);
  };

  const updateColorChangeHandler = (e) => {
    setEnteredUpdateColor(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (enteredColor === "") {
      setFormError(true);
      return;
    }

    const colorObj = {
      color: enteredColor,
      updateColor: enteredUpdateColor,
      coverImage,
      image1,
      image2,
      image3,
      image4,
      image5,
    };

    //  console.log(colorObj)

    dispatch(updateColors({ id, colorObj }));

    //    setEnteredColor('')
    //    setCoverImage('');
    //    setImage1('')
    //    setImage2('')
    //    setImage3('')
    //    setImage4('')
    //    setImage5('')
  };
  return (
    <div>
      <h4>edit colors</h4>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <div>
          {/* <label>
            color:
            <input type="text"  onChange={colorChangeHandler} value={enteredColor}/>
          </label> */}
          <label>
            color:
            <select onChange={colorChangeHandler} value={enteredColor}>
              {newColorArray && newColorArray.map((clr) => (
                <option key={clr._id} value={clr.color}>
                  {clr.color}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="p">selected color :{enteredColor}</p>

        <div>
          <label>
            update color Name
            <input
              type="text"
              onChange={updateColorChangeHandler}
              value={enteredUpdateColor}
            />
          </label>
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
        <button className='btn_adn'>submit</button>
        {formError && <p className="p"> the color field cannot be empty </p>}
        {actionStatus ==='loading' && <Loader />}
         {actionResult && <p className="p">{actionResult}</p>} 
         {actionError && <p className="p">{actionError}</p>} 
      </form>
    </div>
  );
}

export default EditColors;
