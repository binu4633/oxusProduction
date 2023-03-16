import React,{useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import classes from './OrderDetail.module.css';
import {findOrderDetail,getOrderDetail,orderError,orderStatus} from '../../../reduxStore/adminProduct/ordersSlice';
import userAdminSlice from '../../../reduxStore/adminProduct/userAdminSlice';
function OrderDetail() {
    const params = useParams();
    const dispatch = useDispatch();

    const order = useSelector(getOrderDetail);
    const apiStatus = useSelector(orderStatus);
    const apiError = useSelector(orderError)

    const orderId = params.id;
   

    useEffect(()=>{
        if(orderId){
         dispatch(findOrderDetail(orderId))
        }
    },[])

  return (
    <div className={classes.wrapper}>
     
       {
        order &&
        <div>

        <div className={classes.element}>
         <p className="p_white">Id : {order._id}</p>
        </div>
        <div className={classes.element}>
         <p className="p_white">date : {order.createdAt}</p>
        </div>
        <div className={classes.element}>
         <p className="p_white">paymentIntentId : {order.paymentIntentId}</p>
        </div>
        <div className={classes.element}>
         <p className="p_white">customerId: {order.customerId}</p>
        </div>
        <div className={classes.element}>
         <p className="p_white">payment_status: {order.payment_status}</p>
        </div>
        <div className={classes.element}>
         <p className="p_white">delivery_status: {order.delivery_status}</p>
        </div>

        <div className={classes.pr__element}>
          {order.products.map(or=>{
            return(
              <div className={classes.or__products}>

              <p className="p_white">category:{or.category}</p>
              <p className="p_white">name:{or.name}</p>
              {or.image &&
               <div className={classes.pr__image}>
               <img src={or.image} alt="" />
              </div>
              }
             
              <p className="p_white">color:{or.color}</p>
              <p className="p_white">size: {or.size}</p>
              <p className="p_white">price:{or.price}</p>
              {
                or.discount && <p className="p_white">discount :{or.discount}</p>
               
              }
              
              <p className="p_white">quantity:{or.quantity}</p>
              <p className="p_white">totoal:{or.totalPrice}</p>
   
              </div>
            )
          })}
         

        </div >

        <div className={classes.element}>
         <p className="p_white">subtotal: {order.subTotal}</p>
        </div>
        <div className={classes.element}>
         <p className="p_white">shipping_cost: {order.shipping_cost}</p>
        </div>
        <div className={classes.element}>
         <p className="p_white">total: {order.total}</p>
        </div>
        <div className={classes.element}>
         <p className="p_white">total: {order.total}</p>
        </div>
        {
          order.guest ?
          <div className={classes.element}>
         <p className="p_white">guest</p>
        </div>
        :
        <div className={classes.element}>
         <p className="p_white">member id: {order.member}</p>
        </div>

        }
        
       
        <div className={classes.element}>
         <h4 className="p_white">address</h4>

         <div>
         <p className="p_white">{order.shippingAddress.name}</p>
         <p className="p_white">{order.shippingAddress.email}</p>
         <p className="p_white">{order.shippingAddress.phoneNumber}</p>
         <p className="p_white">{order.shippingAddress.country}</p>
         <p className="p_white">{order.shippingAddress.address}</p>
         <p className="p_white">{order.shippingAddress.place}</p>
         <p className="p_white">{order.shippingAddress.city}</p>
         <p className="p_white">{order.shippingAddress.state}</p>
         <p className="p_white">{order.shippingAddress.pinCode}</p>
         </div>
        </div>

      </div>
       }
      

    </div>
  )
}

export default OrderDetail
