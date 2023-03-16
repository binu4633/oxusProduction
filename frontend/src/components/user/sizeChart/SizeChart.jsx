import React from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {productDetail} from '../../../reduxStore/user/fetchProductDetailSlice';
import {sizeChartDisplay} from '../../../reduxStore/user/uiSlice';
import classes from './SizeChart.module.css';

function SizeChart() {
    const dispatch = useDispatch();
    const isSizeDisplay = useSelector(state=>state.ui.sizeChart);
    const product = useSelector(productDetail);

  

    const sizeChart = product && product.sizeType &&  product.sizeType.sizeChart || null;

    const sizeChartArray = []
    if(sizeChart){
        for(let key in sizeChart){

            if(key !=='size'){
              const ar = [];
              ar.push(key);
              ar.push(...sizeChart[key]);
             sizeChartArray.push(ar)
            }
        };
    }
 

    console.log(sizeChartArray)

    const onChartFindHandler = ()=>{
      
        dispatch(sizeChartDisplay())
      }
    

  return (
    // {

    // }
    <div className={classes.wrapper} style={{display:isSizeDisplay?'block':'none'}}>
      <div className={classes.close__bar}>
        <button className={ classes.btn__close} onClick={onChartFindHandler}>X</button>
      </div>
      <div className={classes.chartHeader}>
        <div className={classes.chartHeader__block}>
            <p>size</p>
        </div>
        {product && product.sizeType && product.sizeType.sizeChart && product.sizeType.sizeChart.size.map(s=>{
            return(
                <div className={classes.chartHeader__block}>
                <p>{s}</p>
               </div>
            )
        })}


      </div>
     <div>

        {
         sizeChartArray && sizeChartArray.map(s=>{
            return(
                <div className={classes.chartBody}>
                    {
                        s.map(ss=>{
                            return (
                                <div className={classes.chartBody__block}><p>{ss}</p> </div> 
                            )
                        })
                    }
      
                 
         
                </div>
            )
         })   
        }

    

     </div>
    
      

    </div>
  )
}

export default SizeChart
