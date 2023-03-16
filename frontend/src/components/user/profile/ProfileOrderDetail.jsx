import React,{useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import {findOrderDetail,getOrder,orderError,profileStatus} from '../../../reduxStore/user/profileSlice'
import classes from './Detail.module.css'


function ProfileOrderDetail() {

    const params = useParams();
    const dispatch = useDispatch()

    // console.log('parmsss', params.id);

    const order = useSelector(getOrder);
    const apiStats = useSelector(profileStatus);
    const apiError = useSelector(orderError)

    const [refundable,setRefundable] = useState(false);

    useEffect(()=>{
        dispatch(findOrderDetail(params.id));
    },[])

    useEffect(()=>{
     
        if(!order) return
        if(order.delivery_status === 'delivered'){
          if(order.delivery_date){
            // console.log('delvery date', Date.parse(order.delivery_date) )
            // console.log('date now', Date.now())
            const deliveyDate = Date.parse(order.delivery_date);
            const dateNow = Date.now();

            // console.log('daddd', new Date(dateNow - 604800000 ));
            // console.log('delivery ', new Date(deliveyDate))

            if(dateNow - 604800000 < deliveyDate ){
                // console.log('returnable')
                setRefundable(true)
            }

          } 
        }
       

    },[order])


const onRetunHandler = (order)=>{
    // console.log('order', order)
}


  return (
    <div className={classes.wrapper}>
     
    {
     order &&
     <div>

     {/* <div className={classes.element}>
      <p className="p_white">Id : {order._id}</p>
     </div> */}
     <div className={classes.element}>
      <p className="p_white">date : {order.createdAt}</p>
     </div>
     {/* <div className={classes.element}>
      <p className="p_white">paymentIntentId : {order.paymentIntentId}</p>
     </div>
     <div className={classes.element}>
      <p className="p_white">customerId: {order.customerId}</p>
     </div> */}
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
           {refundable &&
           
            <button className='btn_adn' onClick={onRetunHandler.bind(this,or)}>Return</button>
           }
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
     
    
     <div className={classes.pr__element}>
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

export default ProfileOrderDetail
