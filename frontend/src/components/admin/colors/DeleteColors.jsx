import React,{useState} from "react";
import classes from "./DeleteColor.module.css";
import { useSelector, useDispatch } from "react-redux";
import {deleteColor,getDeleteResponse} from '../../../reduxStore/adminProduct/adminColorsSlice';
import uuid from "react-uuid";
function DeleteColors({ id, colors }) {


const dispatch = useDispatch();
const deleteResponse = useSelector(getDeleteResponse);
const [deleteColor,setDeleteColor] = useState()

const colorDeleteRequest = (color)=>{
 
  setDeleteColor(color)
}

  const colorDeleteHandler = (color)=>{
     
     
      const clrObj = {
        id,color
      }
  

      dispatch(deleteColor(clrObj))
  }

  return (
    <div>
     {colors && colors.map(clr=>{
        return(

            <div className={classes.wrapper} key={uuid()}>
            <div className={classes.block}>
              <div className={classes.color_box}>
                <div className={classes.color_img_wrapper} style={{backgroundColor:clr.color}}>
                {clr.coverImage &&  <img src={clr.coverImage} alt="" />} 
               
                </div>
              </div>
              <div className={classes.color_name}>
                <p> {clr.color}</p>
              </div>
              <div className={classes.delete_box}>
                <button className='btn_adn'  onClick={colorDeleteRequest.bind(this,clr.color)}>delete</button>
              </div>
             
            </div>
             { deleteColor === clr.color && 
                 <div className={classes.confirm__delete}>
                 <p className="p_white">color will delete permently , confirm</p>
                  <button className="btn_adn" onClick={colorDeleteHandler.bind(this,clr.color)} >delete</button>
               </div>
             }
          
          </div>

        )
     })}

     
    
    </div>
  );
}

export default DeleteColors;
