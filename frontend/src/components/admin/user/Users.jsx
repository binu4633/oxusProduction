import React,{useEffect,useRef,useState} from 'react';
import uuid from "react-uuid";
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import {getUsers,userError,userStatus,findUsers,getPageCount} from '../../../reduxStore/adminProduct/userAdminSlice';
import { useParams, useLocation, useSearchParams } from "react-router-dom";
import leftArrow from "../../../imageCl/arrow-left-1.svg";
import rightArrow from "../../../imageCl/arrow-right-1.svg";
import classes from './Users.module.css';
import pageBtnWidth from "../../../utils/pagination";
function Users() {
    const dispatch = useDispatch();
    const userIdRef = useRef()
    const searchRef = useRef();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const users = useSelector(getUsers);
    const apiStats = useSelector(userStatus);
    const apiError = useSelector(userError);
    const totalPages = useSelector(getPageCount);
   
    const [pageCountState, setPageCountState] = useState(0);
    const [rightArrowError, setRightArrowError] = useState();
    const [leftArrowError, setLeftArrowError] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const baseQuery = location.search;

    useEffect(()=>{
      if(baseQuery){
        dispatch(findUsers(baseQuery));
        setSearchParams(baseQuery);
        if(baseQuery.includes('&page=')){
          const pageN = baseQuery.split('&page=')[1];
          setPageNumber(Number(pageN));
          if(Number(pageN) >= 5){
            
            setPageCountState(Number(pageN)-5)
          }
        }
      }
    },[])

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
        color:'white'
      };
      const pageNumStyle2 = {
        backgroundColor: "transparent",
      };

    const userIdSubmitHandler = (e)=>{
       e.preventDefault();
       const query = `?_id=${userIdRef.current.value}`;
       dispatch(findUsers(query));
       setPageNumber(1)
    //    console.log(userIdRef.current.value)

    }



    const searchSubmitHandler = (e)=>{
       e.preventDefault();
       if(searchRef.current.value){
        const query = `?keyword=${searchRef.current.value}`;
        dispatch(findUsers(query));
        setSearchParams(query);
        setPageNumber(1)
       }
       
     
    }

  const fetchAllHandler = ()=>{
    const query = '?sort=-createdAt'
    dispatch(findUsers(query));
    setSearchParams(query);
    setPageNumber(1);
    setPageCountState(0)
  }

    const pageFetchHandler = (page)=>{
        setPageNumber(page);
        
       

        let query;
        if (!baseQuery || baseQuery === "") {
            query = `?page=${page}`;
          } else {
            if(!baseQuery.includes('&page=')){

              query = `${baseQuery}&page=${page}`;
            }else{
              const qsplit = baseQuery.split('&page=');
                 qsplit[1]=page;
                 query = qsplit.join('&page=')
            }
          }

          dispatch(findUsers(query));
          setSearchParams(query);
    }
  return (
    <div className={classes.wrapper}>
        <div>
            <form className={classes.userId_form} onSubmit={userIdSubmitHandler}>
            <div>
              <label>
                user id
                <input type="text" ref={userIdRef}  className={classes.input__text}/>
              </label>
              <button className="btn_adn" >find</button>
            </div>
            </form>
        </div>
        <div>
            <form className={classes.search_form} onSubmit={searchSubmitHandler}>
                <input type="search" ref={searchRef} className={classes.input__text} />
                <button className="btn_adn" >search</button>
            </form>
        </div>
        <div>
            <button className="btn_adn"  onClick={fetchAllHandler} >get all</button>
        </div>
       <table className={classes.table}>
        <thead className={classes.thead}>
          <tr>
            <th>user id</th>
            <th>name</th>
            <th>email</th>
            <th>edit/view</th>

          </tr>
        </thead>
        <tbody className={classes.tbody}>
          {users && users.length >0 && users.map((us) => {
            return (
              <tr>
                <td>{us._id}</td>
                <td>{us.name}</td>
                <td>{us.email}</td>
               
                <td><Link to={`/auth/admin/userDetail/${us._id}`}>view</Link></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
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
    </div>
  )
}

export default Users
