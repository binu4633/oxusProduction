import React,{useEffect,useState} from 'react';
import uuid from "react-uuid";
import {useDispatch,useSelector} from 'react-redux';
import { useParams, useLocation, useSearchParams } from "react-router-dom";
import {findAdminProductCollection,getPageCount,getPage,setPage} from '../../../reduxStore/adminProduct/productCollectionSlice'
import leftArrow from "../../../imageCl/arrow-left-1.svg";
import rightArrow from "../../../imageCl/arrow-right-1.svg";
import pageBtnWidth from "../../../utils/pagination";
import classes from './Pagination.module.css';

function Pagination() {

  const location = useLocation();
  const dispatch = useDispatch();
     
  const baseQuery = location.search;
  const [searchParams, setSearchParams] = useSearchParams();
    const [pageCountState, setPageCountState] = useState(0);
    const [rightArrowError, setRightArrowError] = useState();
    const [leftArrowError, setLeftArrowError] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    const totalPages = useSelector(getPageCount);
    const pageNum = useSelector(getPage);
   const pageCount = totalPages || 1;
  
  const pageArray = [];
  for (let i = 1; i <= pageCount; i++) {
    pageArray.push(i);
  }
  useEffect(()=>{
    // console.log('base query',baseQuery.includes('page'))
    if(baseQuery.includes('page')){
      const pageN =  baseQuery.split('&page=')[1];
    
      if(Number(pageN) !== NaN){
     
        setPageNumber(Number(pageN))
        dispatch(setPage(Number(pageN)))
      }
      
      if(Number(pageN) >= 5){
            
        setPageCountState(Number(pageN)-5)
      }
    
      // console.log('pageN',Number(pageN));
      // setPageNumber(Number(pageN) )
    }else{
      setPageCountState(0)
    }
  },[baseQuery])

  useEffect(()=>{
    setPageNumber(pageNum)
  },[pageNum])

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
    };
    const pageNumStyle2 = {
      backgroundColor: "transparent",
    };

    const pageFetchHandler = (page)=>{
      setPageNumber(page);
      dispatch(setPage(page))

    
   

      let query;
      if (!baseQuery || baseQuery === "") {
          query = `page=${page}`;
        } else {
       
          if(!baseQuery.includes('page=')){

            query = `${baseQuery.split('?')[1]}&page=${page}`;
        
          }else{
         

            const quSplit = baseQuery.split('?')[1];
            
            const pageSplit =  quSplit.includes('&page=') ? quSplit.split('&page=') :  quSplit.split('page=') ;
            pageSplit[1] = page;

            query =  pageSplit.join('&page=')

          }
        }
    
        dispatch(findAdminProductCollection(query));
        setSearchParams(query);

  }
 
  return (
    <div className={classes.pagination}>
    <div className={classes.pagination__box}>
      <div
        className={classes.arrow_box}
        onClick={leftPageHandler}
        style={{ opacity: leftArrowError ? 0 : 1 }}
      >
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
                style={pageNumber === p ? pageNumStyle1 : pageNumStyle2}
                key={uuid()}
                onClick={pageFetchHandler.bind(this, p)}
              >
                {p}
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={classes.arrow_box}
        onClick={rightPageHandler}
        style={{ opacity: rightArrowError ? 0 : 1 }}
      >
        <img src={rightArrow} alt="" />
      </div>
    </div>
  </div>
  )
}

export default Pagination
