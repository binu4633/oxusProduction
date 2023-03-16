import Reac,{useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import uuid from 'react-uuid';
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
  import Loader from "../../../utils/Loader";


function ShowProductSize() {

    const dispatch = useDispatch();
    const size = useSelector(sizes);
    const postSize = useSelector(addedsizes);
    const actionStatus = useSelector(getCategoryStatus);
    const actionError = useSelector(getCategoryError);
   
    const [showSizes, setShowSizes] = useState(false);
    const [updatedSizeName,setUpdatedSizeName] = useState('');
    const [updatedSize,setUpdatedSize] = useState('');
    const [updatedSizeId,setUpdatedSizeId] = useState('');
    const [needUpdate,setNeedUpdate] = useState(false);
    const [needDelete,setNeedDelete] = useState(false);


    const showSizeHandler = () => {
        setShowSizes(!showSizes);
      };
    
    const fetchSizeHandler = ()=>{
        dispatch(fetchSizes())
      }
      const sizeUpdateHandler = (id)=>{
        //    console.log('key',id)
         const updatedSizeFind =  size.find(s=>s._id === id);
        //  console.log('updated size', updatedSizeFind)
         setUpdatedSizeName(updatedSizeFind.sizeName);
         setUpdatedSize(updatedSizeFind.sizes.map(s=>s.size));
         setUpdatedSizeId(updatedSizeFind._id);
        
         setNeedUpdate(true)
        }
        
        // console.log('765657788', updatedSizeName,updatedSize,updatedSizeId)
        
        const updateCancelHandler = ()=>{
            setNeedUpdate(false)
        }
        
        const sizeNameUpdateChangeHandler = (e)=>{
            setUpdatedSizeName(e.target.value);
        }
        
        const sizesUpdateChangeHandler = (e)=>{
            setUpdatedSize(e.target.value);
        }
        
        const sizeUpdateSubmitHanlder = (id)=>{
            // e.preventDefault()
        //    console.log('id', id)
        //    console.log('name',updatedSizeName)
        //    console.log('size',updatedSize)
        
           const sizeObj ={
            id,
            newSize:{
                sizeName:updatedSizeName,
                sizes:updatedSize
            }
           }
        dispatch(updateSizes(sizeObj))
        setNeedUpdate(false)
        }
        
        const sizeDeleteHandler = (id)=>{
        const deleteSizeFind =  size.find(s=>s._id === id);
        //  console.log('updated size', updatedSizeFind)
         setUpdatedSizeName(deleteSizeFind.sizeName);
         setUpdatedSize(deleteSizeFind.sizes);
         setUpdatedSizeId(deleteSizeFind._id);
        
         setNeedDelete(true)
        }
        
        const deleteCancelHandler = ()=>{
            setNeedDelete(false)
        };
        
        const deleteSubmitHanlder = (id)=>{
            dispatch(deleteSizes(id));
            setNeedDelete(false)
        }
        

    const udapteFormComponent =
 
    <div className={classes.form_div}>
    <label>
      size name:
      <input
        type="text"
        className={classes.input__text}
        onChange={sizeNameUpdateChangeHandler}
        //   onBlur={nameBlurHandler}
        value={updatedSizeName}
        // onFocus={sizeFocusHandler}
      />
    </label>
    <br/>
    <label>
      sizes:
      <input
        type="text"
        className={classes.input__text}
        onChange={sizesUpdateChangeHandler}
        //   onBlur={nameBlurHandler}
        value={updatedSize}
        // onFocus={sizeFocusHandler}
      />
    </label>
    <br/>
    <button className="btn_adn" onClick={sizeUpdateSubmitHanlder.bind(this,updatedSizeId)} >update</button>
    <button className="btn_adn"  onClick={updateCancelHandler}>cancel</button>
    <p className="p">Add comma seperated value like M,S etc</p>
    </div>
//   </form>

const deleteFormComponent =
     <div className={classes.form_div}>
     <p className="p">{updatedSizeName}</p>
     <p className="p">This will delete size permently</p>
     <button className="btn_adn" onClick={deleteSubmitHanlder.bind(this,updatedSizeId)} >delete</button>
     <button type="button" className="btn_adn" onClick={deleteCancelHandler}>cancel</button>
     </div>
  return (
    <div>
       <div className={classes.menu__btn_block}>
        <button onClick={showSizeHandler} className={classes.btn__menu}>
          <p className="p">{showSizes ? "hide  sizes" : "show sizes"}</p>{" "}
        </button>
        </div>
        {showSizes && !needUpdate && !needDelete &&
        <div className={classes.block}>
         <button className="btn_adn" onClick={fetchSizeHandler}>
              fetch sizes
            </button>

            {size && size.length > 0 &&
              size.map((s,i)=>{
                return(
                <div key={uuid()} >
                <div >
                <p className="p">{s.sizeName}</p>
                <div>
                   { s.sizes.map((sz,i)=>{
                       return (<span  key={uuid()} className={classes.size__span}>{sz.size}</span>)
                    })}
            
                </div>
                   <button className="btn_adn" onClick={sizeUpdateHandler.bind(this,s._id)}>update</button>
                   <button className="btn_adn" onClick={sizeDeleteHandler.bind(this,s._id)}>delete</button>
                  
                </div>
                
                </div>
                )
              })
             }
           
        </div>
        }
        {needUpdate &&     udapteFormComponent }
           {needDelete && deleteFormComponent}
          {actionError && <p className="p">{actionError}</p>}
    </div>
  )
}

export default ShowProductSize
