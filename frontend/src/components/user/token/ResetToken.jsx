import React,{useState,useRef,useEffect} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import classes from './ResetToken.module.css';
import {resetForgetPassword,getUserStatus,getForgetResetResult,forgoResetError} from '../../../reduxStore/user/userSlice';
import {toggleLoginMenu} from '../../../reduxStore/user/uiSlice'
import Loader from '../../../utils/Loader';
function ResetToken() {
     const dispatch = useDispatch();
     const navigate = useNavigate();
    const params = useParams();
     const passRef = useRef()
     const conPassRef = useRef()
     const [passError,setPassError] = useState(false);

     const apiResult = useSelector(getForgetResetResult);
     const apiStatus = useSelector(getUserStatus);
     const apiError  = useSelector(forgoResetError)

    // console.log('parms ', params.token)

  

 useEffect(()=>{
    
    if(apiStatus === 'succeeded'){
       
      if(apiResult === 'success'){
        dispatch(toggleLoginMenu())
        navigate('/')
      }   
    }

 },[apiResult,apiStatus ==='succeded'])



   const onPassForgetHandler = (e)=>{
    e.preventDefault()
    const pass = passRef.current.value;
    const conPass = conPassRef.current.value;

      if(pass === conPass){

        const payload = {
            pass,
            token:params.token
        }
        dispatch(resetForgetPassword(payload))
        setPassError(false)
      }else{
        setPassError(true)
      }

   
   }

  return (
    <div  className={classes.wrapper}>
        <div className={classes.form__box}>
            {apiStatus ==='loading' && <Loader/>}
            {apiStatus !=='loading' && 
              <form onSubmit={onPassForgetHandler}>
              <div className={classes.form__div}>
               <label>
                  <p className={classes.p}> new password</p>

               <input type="password"  className={classes.input} ref={passRef}/>
               </label>
              </div>
              <div   className={classes.form__div}>
               <label>
               <p className={classes.p}>confirm password</p>


               <input type="password"   className={classes.input} ref={conPassRef}/>
               </label>
              </div>
              {passError &&<p className='p_white'>password mismatch</p>}
              {apiError && <p className='p_white'>{apiError}</p>}
              <button className='btn_adn'>submit</button>
            </form>
            }

            
        </div>
    </div>
  )
}

export default ResetToken
