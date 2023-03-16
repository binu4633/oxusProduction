import React,{useState,useEffect} from 'react'
import classes from './PinCheck.module.css';
import {useDispatch, useSelector} from 'react-redux'
import {pinCheck,errorPin,pinStatus,getPinResult} from '../../../reduxStore/user/pinSlice';
import Loader from '../../../utils/Loader';

function PinCheck() {
    const dispatch = useDispatch();
   
    const pinResult = useSelector(getPinResult);
    const stats = useSelector(pinStatus);
    const error = useSelector(errorPin);

    const [enteredPin,setEnteredPin] = useState('');
    const [pinError,setPinError] = useState(false);

  
    const pinChangeHandler = (e)=>{
      setEnteredPin(e.target.value);
    }

    const onPinSubmitHandler = (e)=>{
        e.preventDefault() 
        if(enteredPin.length !== 6){
           setPinError(true)
           return
        }else{
          setPinError(false)
        }

        const pinObj = {
            pin:enteredPin
        }
      
        dispatch(pinCheck(pinObj))
    }

  return (
    <div>
       <form onSubmit={onPinSubmitHandler}>
        <div className={classes.pin_box} >
           <input type="number" value={enteredPin} onChange={pinChangeHandler}/>
           <button >check</button>
          {pinError && <p className="p_white">pin must have 6 digit</p>} 
          {pinResult && <p className="p_white">{pinResult.result}</p>} 
          {error && <p className="p_white">{error}</p>} 

        </div>
       </form>
    </div>
  )
}

export default PinCheck
