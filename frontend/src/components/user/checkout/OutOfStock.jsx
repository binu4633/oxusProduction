import React,{useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {getProductOutOfStock,paymentStatss,paymentError,removeFromOutOfStock} from '../../../reduxStore/user/paymentSlice';
import classes from './OutOfStock.module.css';
import {removeOutOfStock} from '../../../reduxStore/user/cartSlice'


function OutOfStock() {
    const dispatch = useDispatch()
    const outOfStock = useSelector(getProductOutOfStock);
    const statts = useSelector(paymentStatss);
    const error = useSelector(paymentError);
    const cartProducts = useSelector(state=>state.cart.products);
    const [newOutOfStock,setNewOutOfStock] = useState()



    useEffect(()=>{
    
      if(outOfStock && outOfStock.length >0){
      
       const outOfStockProducts= outOfStock.map(out=>{
         const deletePro =  cartProducts.filter(crt=> crt._id === out._id && crt.sku === out.sku);
       
          // outOfStockProducts.push(deletePro)
         return deletePro
        })
        // setNewOutOfStock(...outOfStockProducts)
        setNewOutOfStock(outOfStockProducts)
     
      }
    },[outOfStock])



// console.log('new out of stock', newOutOfStock.flatMap(a=>a))
    const onDeleteOutOfStock = ()=>{
        const outSku = outOfStock.map(out=>out.sku);
        // console.log(outSku)
        dispatch(removeOutOfStock(outSku));
        dispatch(removeFromOutOfStock());
        setNewOutOfStock(null)
    }

  return (
    <div>
    {outOfStock && outOfStock.length > 0 && 
    <div className={classes.wrapper}>
     {/* {outOfStockProducts  && outOfStockProducts.length >0 &&   <p className="p">test out </p> } */}
   
    
           <div>
           <p className="p">these products are out of stock,delete this products from cart</p>
           <button className={classes.btn} onClick={onDeleteOutOfStock}><p className="p">delete from cart</p></button>
         </div>
    
 
      {
      newOutOfStock && newOutOfStock.length > 0 &&
      newOutOfStock.flatMap(a=>a).map(out=>{
        return (
            <div className={classes.oneStock} key={out.sku}>
            <div className={classes.img__wrapper}>
               <img src={out.image} alt="" />
            </div>
            <div>
            <p className="p">{out.category}</p>
            <p className="p">{out.name}</p>
            <p className="p">size:{out.size}</p>
            <p className="p">color:{out.color}</p>
            </div>
          
          </div>
        )
      })
      }

      
    </div>
  }
  </div>
  )
}

export default OutOfStock
