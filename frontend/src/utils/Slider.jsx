import React, { useState, useEffect } from "react";
import classes from "./Slider.module.css";
import {useSelector} from 'react-redux'

import {getImages,imageStatus,imageError} from '../reduxStore/user/slideImageSlice';
import Loader from "./Loader";
import leftArrow from '../imageCl/arrow-left-black.png'
import rightArrow from '../imageCl/arrow-right-black.png'

function Slider() {


const images = useSelector(getImages);
const stats = useSelector(imageStatus);
const error = useSelector(imageError);

// console.log('iamges', images);
// console.log('stats', stats);
// console.log('error', error)






// console.log( 'images array', imagesArray)

  // console.log('slides',slides)
  const [sliderCount, setSliderCount] = useState(0);
  const [sliderArrayValid,setSlideArrayValid] = useState(false);

  // slides.find(sl=>sl === undefined)
  // // console.log('find undifined',  slides.find(sl=>typeof(sl)  === undefined))
  // console.log('find undifined',  slides)
  // console.log(slides)
  const leftArrowHandler = () => {
    setSliderCount(sliderCount - 100);
    if (sliderCount === (images.length - 1) * -100) {
      setSliderCount(0);
    }
  };
  const rightArrowHandler = () => {
    setSliderCount(sliderCount + 100);
    if (sliderCount === 0) {
      setSliderCount((images.length - 1) * -100);
    }
    // console.log("slidercont", sliderCount);
  };

  const imageSlideHandler = (index) => {
    // console.log(index);
    setSliderCount(index*-100)
  };
  let startX;
  let startY;
  let endX;
  let endY;

  const sliderTouchStart = (e)=>{
    // console.log('touch e',e)
    [...e.changedTouches].forEach(t=>{
      startX= t.clientX;
      startY= t.clientY;
      // console.log('startX', startX);
      // console.log('startY', startY);
     })
  };

  const sliderTouchEnd = (e)=>{
    [...e.changedTouches].forEach(t=>{
      endX= t.clientX;
      endY= t.clientY;
      // console.log('endX', endX);
      // console.log('endY', endY);

      if(startX < endX){
        // console.log('moves to right',sliderCount);
        if(sliderCount !== 0){
          setSliderCount(sliderCount + 100);
          if (sliderCount === 0) {
            setSliderCount((images.length - 1) * -100);
          }
        }
    
      }
      if(startX > endX){
        // console.log('moves to left',sliderCount)
        if(sliderCount !== -400){
          setSliderCount(sliderCount - 100);
          if (sliderCount === (images.length - 1) * -100) {
            setSliderCount(0);
          }
        }
      
      }
   
  
     })
  }

 
  const slideMotion = {
    transform: `translateX(${sliderCount}%)`,
    transition: "all 0.5s",
  };
// console.log('sliderCount', sliderCount/-100)
  return (
    <>
    {/* {stats === 'loading' && <Loader />} */}
   {images && images.length >0 && stats !== 'loading' &&
    <div className={classes.slider_main} onTouchStart={sliderTouchStart} onTouchEnd={sliderTouchEnd}>
      {/* <i className="fa-solid fa-chevron-left" onClick={leftArrowHandler}></i> */}
      <div className={classes.arrow_left} onClick={leftArrowHandler}>
         <img src={leftArrow} alt="" />
      </div>
      <div className={classes.arrow_right} onClick={rightArrowHandler}>
         <img src={rightArrow} alt="" />
      </div>
      {/* <i className="fa-solid fa-chevron-right" onClick={rightArrowHandler}></i> */}
      <div className={classes.slider_box}>
        <div className={classes.slide_wrapper} style={slideMotion}>
          {images.map((slide, index) => {
            return (
              <div className={classes.slides} key={index}>
                <img src={slide} alt={`image${index}`} />
                
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes.slider_image_button}>
        {images.map((slide, index) => {
          // console.log("image button index", index);
          return (
            <div className={classes.imageButton} key={index}>
              <div
                className={classes.slides}
                onClick={imageSlideHandler.bind(this, index)}
              >
                <img src={slide} alt={`image${index}`} 
                style={(sliderCount/-100 === index ?{border:'2px solid black'}:{border:'none'})}
                />
               
              </div>
            </div>
          );
        })}
      </div>
    </div>
     }
     {!images || images.lenth === 0 && <p className="p">fetching images</p>}
     {stats === 'loading' && <Loader />}
     {error && <p className="p">{error}</p>}
     
    </>
  );
}

export default Slider;
