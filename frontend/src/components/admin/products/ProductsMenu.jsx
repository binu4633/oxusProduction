import React,{useRef,useState,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {  useLocation, useSearchParams } from "react-router-dom";
import { findAdminProductCollection ,setPage} from "../../../reduxStore/adminProduct/productCollectionSlice";
import {fetchCategory,category,getCategoryStatus,getCategoryError} from '../../../reduxStore/adminProduct/categoryAndSizeSlice';
import classes from "./ProductsMenu.module.css";

function ProductsMenu() {
  const dispatch = useDispatch();

  const location = useLocation();
  
  let baseQuery = location.search;

  const productIdRef = useRef();
  const categoryRef = useRef();
  const priceSortRef = useRef();
  const priceStartRef = useRef();
  const priceEndRef = useRef();
  const discountSortRef = useRef();
  const discountStartRef = useRef();
  const discountEndRef = useRef();
  const stockSortRef = useRef();
  const stockStartRef = useRef();
  const stockEndRef = useRef();
  const publishRef = useRef();

  const [productIsSelector,setProductIdSelector] = useState(false);
  const [filterSelector,setFilterSelector] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

 const getCategory = useSelector(category);
 const apiCatStats = useSelector(getCategoryStatus);
 const apiCatError = useSelector(getCategoryError); 

 useEffect(() => {
  if(baseQuery){
  
    const query = baseQuery.split('?')[1]
    dispatch(findAdminProductCollection(query));
  }
}, []);

 let getCategoryArray
  if(getCategory){
     getCategoryArray = [...getCategory];
     getCategoryArray.unshift({category:'all'})
  }

const productIdSelectHandler = ()=>{

  if(productIsSelector){
    setProductIdSelector(false);
    setFilterSelector(false)
  }else{
    setProductIdSelector(true);
    setFilterSelector(false)
  }

}

const filterSelectHandler = ()=>{
  if(filterSelector){
    setProductIdSelector(false);
    setFilterSelector(false)
  }else{
    setProductIdSelector(false);
    setFilterSelector(true)
  }
}

  const fetchProducts = () => {

    // console.log(baseQuery);
    // if(baseQuery){
    //   console.log('base',baseQuery)
    // }else{
    //   console.log('there is  no query query')
    // }

    const query = 'sort=-createdAt'

    dispatch(findAdminProductCollection(query));
    setSearchParams(query);
    dispatch(setPage(1));
    // setPageCountState(0)
  };

  const productIdFetchHandler= (e)=>{
    e.preventDefault();
    const query =`_id=${productIdRef.current.value}`;
    dispatch(findAdminProductCollection(query))
  }
  const categoryFindHandler = ()=>{
      dispatch(fetchCategory());
  }

  const onFilterHandler = (e)=>{
    e.preventDefault();

    
  

    let categoryQuery ;
    let priceSortQuery;
    let priceStartQuery;
    let priceEndQuery;
    let discountSortQuery;
    let discountStartQuery;
    let discountEndQuery;
    let stockSortQuery;
    let stockStartQuery;
    let stockEndQuery;
    let publishQuery;
    if(categoryRef.current.value !=='all'){
       categoryQuery = `&category=${categoryRef.current.value }`
    }

    if(priceSortRef.current.value!=='all'){
       if(priceSortRef.current.value === 'high'){
        priceSortQuery= `&sort=-price`
       }
       if(priceSortRef.current.value === 'low'){
        priceSortQuery= `&sort=price`
       }
    }

    if(priceStartRef.current.value > 0){
      priceStartQuery = `&price[gte]=${priceStartRef.current.value}`
    }

    if(priceEndRef.current.value > 0){
      priceEndQuery = `&price[lte]=${priceEndRef.current.value}`
    }
   
    if(discountSortRef.current.value !=='all'){
      if(discountSortRef.current.value === 'high'){
        discountSortQuery= `&sort=-discount`
       }
       if(discountSortRef.current.value === 'low'){
        discountSortQuery= `&sort=discount`
       }
    }
    if(discountStartRef.current.value > 0){
      discountStartQuery = `&discount[gte]=${discountStartRef.current.value}`
    }

    if(discountEndRef.current.value > 0){
      discountEndQuery = `&discount[lte]=${discountEndRef.current.value}`
    }
    if(stockSortRef.current.value !=='all'){
      if(stockSortRef.current.value === 'high'){
        stockSortQuery= `&sort=-productStockCount`
       }
       if(stockSortRef.current.value === 'low'){
        stockSortQuery= `&sort=productStockCount`
       }
    }
    if(stockStartRef.current.value > 0){
      stockStartQuery = `&productStockCount[gte]=${stockStartRef.current.value}`
    }
    
    if(stockEndRef.current.value > 0){
      stockEndQuery = `&productStockCount[lte]=${stockEndRef.current.value}`
    }
    if(publishRef.current.value !=='all'){
      if(publishRef.current.value === 'true'){
        publishQuery= `&publish=true`
       }
       if(publishRef.current.value === 'false'){
        publishQuery= `&publish=false`
       }
    }


    let query =`${categoryQuery ?categoryQuery:''}${priceSortQuery?priceSortQuery:''}${priceStartQuery?priceStartQuery:''}${priceEndQuery?priceEndQuery:''}${discountSortQuery?discountSortQuery:''}${discountStartQuery?discountStartQuery:''}${discountEndQuery?discountEndQuery:''}${stockSortQuery?stockSortQuery:''}${stockStartQuery?stockStartQuery:''}${stockEndQuery?stockEndQuery:''}${publishQuery?publishQuery:''}`
    // console.log('query',query)
    dispatch(findAdminProductCollection(query));
    setSearchParams(query);
    dispatch(setPage(1))
    
  }

  return (
    <div className={classes.menu__bar}>
      <div className={classes.menu_block}>
      <div>
        <button className="btn_adn" onClick={fetchProducts}>all</button>
      </div>
      <div>
        <button className="btn_adn" onClick={productIdSelectHandler}>product id</button>
      </div>
      <div>
        <button className="btn_adn" onClick={filterSelectHandler}>filter</button>
      </div>
      </div>
      {productIsSelector && 
      <div>
        <form onSubmit={productIdFetchHandler} className={classes.form}>
          <label>
            product id:
            <input type="text" ref={productIdRef}/>
          </label>
          <button className="btn_adn">find</button>
        </form>
      </div>
      }
      {filterSelector && 
      
      <div >
         <form className={classes.form} onSubmit={onFilterHandler}>

         <div className={classes.just_div}>
          <label>
            Category:
            <select  className={classes.select} ref={categoryRef}>
       
              {  getCategoryArray && getCategoryArray.map((cat) => (
               
                <option key={cat._id} value={cat.category}>
                  {cat.category}
                </option>
              ))}
             
            </select>
          </label>
           <button type="button" onClick={categoryFindHandler} className={classes.btn_find}>find category</button>
        </div>

        <div className={classes.just_div}>
          <label>
            price
            <select ref={priceSortRef} className={classes.select}>
              <option value="all">all</option>
              <option value="high">from high</option>
              <option value="low">from low</option>
            </select>
          </label>
        </div>
        <div className={classes.just_div}>
          <label>
            price start
            <input type="number"  ref={priceStartRef} />
          </label>
          <label>
            price end
            <input type="number"  ref={priceEndRef}/>
          </label>
        </div>

        <div className={classes.just_div}>
          <label>
            discount
            <select ref={discountSortRef} className={classes.select}>
              <option value="all">all</option>
              <option value="high">from high</option>
              <option value="low">from low</option>
            </select>
          </label>
        </div>
        <div className={classes.just_div}>
          <label>
            discount start
            <input type="number"  ref={discountStartRef} />
          </label>
          <label>
            discount end
            <input type="number"  ref={discountEndRef}/>
          </label>
        </div>
        <div className={classes.just_div}>
          <label>
            stock
            <select ref={stockSortRef} className={classes.select}>
              <option value="all">all</option>
              <option value="high">from high</option>
              <option value="low">from low</option>
            </select>
          </label>
        </div>
        <div className={classes.just_div}>
          <label>
            stock start
            <input type="number"  ref={stockStartRef} />
          </label>
          <label>
            stock end
            <input type="number"  ref={stockEndRef}/>
          </label>
        </div>
        <div className={classes.just_div}>
          <label>
            publish
            <select ref={publishRef} className={classes.select}>
              <option value="all">all</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </label>
        </div>
           <button className="btn_adn">find</button>

         </form>
      </div>
      }
    </div>
  );
}

export default ProductsMenu;
