import React,{useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {getUserDetail,userError,userStatus,findUserDetail} from '../../../reduxStore/adminProduct/userAdminSlice'
import classes from './UserDetail.module.css';
function UserDetail() {
  const params = useParams();
  const dispatch = useDispatch();

  const user = useSelector(getUserDetail);
  const apiStatus = useSelector(userStatus);
  const apiError = useSelector(userError);

 useEffect(()=>{
    if(params.id){
        dispatch(findUserDetail(params.id))
    }
 },[])

  return (
    <div className={classes.wrapper}>
      {user && 
 <div className={classes.user__wrapper}>
 <div className={classes.element}>
  <p className="p_white">name: {user.name}</p>
 </div>
 <div className={classes.element}>
  <p className="p_white">email: {user.email}</p>
 </div>
 {user.image &&
    <div className={classes.element}>
    <div className={classes.user_img}>
     <img src={user.image} alt="" />
    </div>
</div>
 }

 <div className={classes.address_wrapper}  >
  <h4 className="p_white">Address</h4>
  <div >
  {
    user.address.length > 0 && user.address.map(ur=>{
      return(
           <div className={classes.address_block}>
              <p className="p_white">{ur.name}</p>
              <p className="p_white">{ur.email}</p>
              <p className="p_white">{ur.phoneNumber}</p>
              <p className="p_white">{ur.country}</p>
              <p className="p_white">{ur.address}</p>
              <p className="p_white">{ur.place}</p>
              <p className="p_white">{ur.city}</p>
              <p className="p_white">{ur.state}</p>
              <p className="p_white">{ur.pinCode}</p>
            </div> 

      )
    })
  }
  </div>


 </div>
 
 <div >
     {user.orders && user.orders.length > 0 && user.orders.map(ur=>{
      return(
        <div className={classes.or__element}>
        <p className="p_white">order: {ur.order} </p>
        <p className="p_white">date: {ur.date} </p>
      </div>
      )
    
     })}
 </div>

  
</div>

      }
      

    </div>
  )
}

export default UserDetail
