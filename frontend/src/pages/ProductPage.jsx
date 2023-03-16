import React, { useEffect, useState } from "react";
import { useParams, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import ProductCard from "../components/user/products/ProductCard";

import {
  fetchProducts,
  getProducts,
  productStatus,
  productsError,
  pageCounts
} from "../reduxStore/user/fetchProductsSlice";
import classes from "./ProductPage.module.css";
import pageBtnWidth from "../utils/pagination";
import useSize from '../hooks/use-windowSize';
import Loader from "../utils/Loader";
import leftArrow from '../imageCl/arrow-left-1.svg'
import rightArrow from '../imageCl/arrow-right-1.svg'

function ProductPage() {
 
const size = useSize()
 

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  
  let baseQuery = location.search;
  //

  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const totalPages = useSelector(pageCounts)
  const stats = useSelector(productStatus);
  const error = useSelector(productsError);
  const searchKey = useSelector(state=>state.ui.searchKeyword)

  const [gridSize, setGridSize] = useState(3); // make it based on size resposive
  const [pageCountState, setPageCountState] = useState(0);
  const [rightArrowError, setRightArrowError] = useState();
  const [leftArrowError, setLeftArrowError] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if(baseQuery){

      dispatch(fetchProducts(baseQuery));
     
      setSearchParams(baseQuery);
    }
  }, []);

  useEffect(()=>{
    if(searchKey !==''){
      setSearchParams(searchKey);
      setPageNumber(1)
    }
    
  },[searchKey])

  useEffect(()=>{
    // console.log('base query',baseQuery.includes('page'))
    if(baseQuery.includes('page')){
      const pageN =  baseQuery.split('&page=')[1];
    
      if(Number(pageN) !== NaN){
        // console.log('pagge is number')
        setPageNumber(Number(pageN))
      }
      if(Number(pageN) >= 5){
            
        setPageCountState(Number(pageN)-5)
      }

      // console.log('pageN',pageN);
      // setPageNumber(Number(pageN) )
    }
  },[])

  useEffect(()=>{
    if(size.width > 600){
      setGridSize(3)
    }
    if(size.width <= 600){
      setGridSize(1)
    }
  },[size.width])



  const pageCount = totalPages || 1;
  const pageArray = [];
  for (let i = 1; i <= pageCount; i++) {
    pageArray.push(i);
  }

  useEffect(() => {
    if (pageCountState === 0) {
      setLeftArrowError(true);
    } else {
      setLeftArrowError(false);
    }

    if (pageCountState + 5 >= pageCount) {
      setRightArrowError(true);
    } else {
      setRightArrowError(false);
    }
  }, [pageCountState, pageCount]);
  const productFilterHandler = (e) => {
    let query;
    if (e.target.value === "price+") {
      query = "&sort=+price";
    } else if (e.target.value === "price-") {
      query = "&sort=-price";
    } else if (e.target.value === "discount") {
      query = "&sort=-discount";
    } else if (e.target.value === "latest") {
      query = "&sort=-createdAt";
    }
    if (query) {
      let queryString ;
      if(!baseQuery.includes('&sort=')){
        queryString = `${baseQuery}${query}`;
        setPageNumber(1);
      }else{
        const splitQuery =  baseQuery.split('&sort=');
        splitQuery[1]= query;
        splitQuery[2]='&page=1';
        queryString = splitQuery.join('');
        setPageNumber(1);
      }  
     
      setSearchParams(queryString);
      dispatch(fetchProducts(queryString));
      setPageCountState(0)
    }
  };
  const pageFetchHandler = (page) => {
    // console.log("page", page);
    setPageNumber(page);
    // console.log(baseQuery)
    let pageQuery ;
    if(!baseQuery.includes('&page=')){
      pageQuery = `${baseQuery}&page=${page}`;
    }else{
      const splitQuery =  baseQuery.split('&page=');
      const doesQuerySort = splitQuery[1].split('&sort');
      if(doesQuerySort.length === 1){

          splitQuery[1]=page;
          pageQuery = splitQuery.join('&page=');
      }else{
        doesQuerySort[0]=`&page=${page}`;
        doesQuerySort[1]='&sort'+doesQuerySort[1];
        pageQuery= splitQuery[0]+doesQuerySort.join('')
      }

    }
  
    setSearchParams(pageQuery);
    dispatch(fetchProducts(pageQuery));
  };
  const leftPageHandler = () => {
  
    if (pageCountState == 0) return;
    setPageCountState((prev) => prev - 1);
  };
  const rightPageHandler = () => {
   
    if (pageCountState + 5 == pageCount) return;
    setPageCountState((prev) => prev + 1);
  };



  const pageNumStyle1 = {
    backgroundColor: "var(--bg-3)",
    // border:'1px solid rgba(235, 10, 47, 1)',
    // color:'rgba(235, 10, 47, 1)'
  };
  const pageNumStyle2 = {
    backgroundColor: "transparent",
  };

  const gridHandler = (size) => {
   
    setGridSize(size);
  };

  // const style3 = {
  //   gridTemplateColumns: "repeat(3, 1fr )",
  // };
  // const style5 = {
  //   gridTemplateColumns: "repeat(5, 1fr )",
  // };
  // const style1 = {
  //   gridTemplateColumns: "repeat(1, 1fr )",
  // };
  // const style2 = {
  //   gridTemplateColumns: "repeat(2, 1fr )",
  // };
 


  return (
    <div className={classes.collections}>
      <div className={classes.filter__bar}>
      
       

        <div className={classes.display__filter}>
          <div className={classes.display__filter__large}>
            <button
              className={classes.display__three}
              onClick={gridHandler.bind(this, 3)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <button
              className={classes.display__five}
              onClick={gridHandler.bind(this, 5)}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
         
          </div>
          <div className={classes.display__filter__small}>
          <button
              className={classes.display__one}
              onClick={gridHandler.bind(this, 1)}
            >
              <span></span>
              
            </button>
            <button
              className={classes.display__two}
              onClick={gridHandler.bind(this, 2)}
            >
              <span></span>
              <span></span>
             
            </button>
          </div>
        </div>
        <div className={classes.product__sort}>
          <span>Sort By</span>
          <select name="" id="" onChange={productFilterHandler}>
            <option value="">Relevence</option>
            <option value="price+"> price (low-first)</option>
            <option value="price-"> price (heigh-first)</option>
            <option value="discount"> discount</option>
            <option value="latest"> latest</option>
          </select>
        </div>
      </div>

      {/* <div className={classes.gridClass} > */}
      {/* <div style={gridSize ===3 ?gridClass3:gridClass5}> */}
      <div className={gridSize === 1 ? classes.card__collection_1: gridSize ===2?classes.card__collection_2:gridSize===3?classes.card__collection_3:classes.card__collection_5}>
       
       {stats ==='loading' && <Loader/>}
       {error && <p className="p_white">{error}</p> } 
       
        {products &&
          products.map((pr) => {
            return <ProductCard product={pr} gridSize={gridSize} key={uuid()} />;
          })}
          {/* <div style={{height:'40rem',border:"1px solid red"}}></div>
          <div style={{height:'40rem',border:"1px solid red"}}></div>
          <div style={{height:'40rem',border:"1px solid red"}}></div>
          <div style={{height:'40rem',border:"1px solid red"}}></div>
          <div style={{height:'40rem',border:"1px solid red"}}></div> */}
          
      </div>
      <div className={classes.pagination}>
        <div className={classes.pagination__box}>
          <div
            className={classes.arrow_box}
            onClick={leftPageHandler}
            style={{ opacity: leftArrowError ? 0 : 1 }}
          >
            {/* <img src="./images/arrow-left-black.png" alt="" /> */}
            <img src={leftArrow} alt="" />
          </div>

          <div className={classes.pagination_pages}>
            <div
              className={classes.page_container}
              style={{
                transform: `translateX(-${pageBtnWidth * pageCountState}rem)`,
              }}
            >
              {pageArray.map((p) => {
                return (
                  <div
                    className={classes.page}
                    style={pageNumber === p ? pageNumStyle1 :pageNumStyle2}
                    key={uuid()}
                    onClick={pageFetchHandler.bind(this, p)}
                  >
                    {p}
                  </div>
                );
              })}
              {/* <div className={classes.page}>1</div>
                <div className={classes.page}>2</div>
                <div className={classes.page}>3</div>
                <div className={classes.page}>4</div> */}
            </div>
          </div>

          <div
            className={classes.arrow_box}
            onClick={rightPageHandler}
            style={{ opacity: rightArrowError ? 0 : 1 }}
          >
            {/* <img src="./images/arrow-right-black.png" alt="" /> */}
            <img src={rightArrow} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
