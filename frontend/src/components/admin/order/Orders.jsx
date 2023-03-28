import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useSearchParams } from "react-router-dom";
import uuid from "react-uuid";
import { Link } from "react-router-dom";
import classes from "./Orders.module.css";
import {
  findOrders,
  getOrders,
  getPageCount,
  orderStatus,
  orderError,
} from "../../../reduxStore/adminProduct/ordersSlice";
import leftArrow from "../../../imageCl/arrow-left-1.svg";
import rightArrow from "../../../imageCl/arrow-right-1.svg";
import pageBtnWidth from "../../../utils/pagination";
function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector(getOrders);
  const totalPages = useSelector(getPageCount);
  const status = useSelector(orderStatus);
  const apiError = useSelector(orderError);
  const location = useLocation();
  const baseQuery = location.search;


  const orderIdRef = useRef();
  const memberIdRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [deliveryStats, setDeliveryStats] = useState();

  const [pageCountState, setPageCountState] = useState(0);
  const [rightArrowError, setRightArrowError] = useState();
  const [leftArrowError, setLeftArrowError] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  const [orderIdShow, setOrderIdShow] = useState(false);
  const [memberIdShow, setMemeberIdShow] = useState(false);
  const [filterShow, setFilterShow] = useState(false);

  const pageCount = totalPages || 1;
  const pageArray = [];
  for (let i = 1; i <= pageCount; i++) {
    pageArray.push(i);
  }

//   useEffect(() => {

//     dispatch(findOrders());
//   }, []);


useEffect(()=>{
  if(baseQuery){
    dispatch(findOrders(baseQuery));
    setSearchParams(baseQuery);
    if(baseQuery.includes('&page=')){
      const pageN = baseQuery.split('&page=')[1];
      setPageNumber(Number(pageN));
      if(Number(pageN) >= 5){
      
        setPageCountState(Number(pageN)-5)
      }else{
        //  console.log('page below five')
        // setPageCountState(Number(pageN))
        
      }
      // setPageCountState(Number(pageN))
    }
  }
},[])
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
    backgroundColor:"var(--bg-3)",
  };
  const pageNumStyle2 = {
    backgroundColor: "transparent",
  };
  const orderIdSubmitHandler = (e) => {
    e.preventDefault();
 
    const query = `?_id=${orderIdRef.current.value}`;
    dispatch(findOrders(query));
    setPageNumber(1);
  };
  const memberIdSubmitHandler = (e) => {
    e.preventDefault();
   
    const query = `?member=${memberIdRef.current.value}`;
    dispatch(findOrders(query));
    setPageNumber(1);
  };

  const startDateChangeHandler = (e) => {
    setStartDate(e.target.value);

  };
  const endDateChangeHandler = (e) => {
    setEndDate(e.target.value);
    
  };
  const endStartDateHandler = () => {
    setStartDate(null);
  };
  const endEndDateHandler = () => {
    setEndDate(null);
  };
  const deliverySelectHandler = (e) => {
    setDeliveryStats(e.target.value);
  };

  const filterSubmitHandler = (e) => {
    e.preventDefault();
    console.log(startDate);
    console.log(endDate);
    console.log(deliveryStats);

    let startQuery;
    let endQuery;
    let deliveryQuery;

    if (startDate) {
      startQuery = `&createdAt[gte]=${startDate}`;
    }
    if (endDate) {
      endQuery = `&createdAt[lte]=${endDate}`;
    }

    if (deliveryStats) {
      if (deliveryStats === "pending") {
        deliveryQuery = `&delivery_status=pending`;
      }
      if (deliveryStats === "delivered") {
        deliveryQuery = `&delivery_status=delivered`;
      }
      if (deliveryStats === "all") {
        deliveryQuery = "";
      }
    }

    let query = `?sort=-createdAt${startQuery ? startQuery : ""}${
      endQuery ? endQuery : ""
    }${deliveryQuery ? deliveryQuery : ""}`;
    dispatch(findOrders(query));
    setSearchParams(query);
    setPageNumber(1);
  };
  const pageFetchHandler = (page) => {
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
    dispatch(findOrders(query));
    setSearchParams(query);
  };

  const orderShowHandler = () => {
    setOrderIdShow(true);
    setMemeberIdShow(false);
    setFilterShow(false);
  };
  const memberShowHandler = () => {
    setOrderIdShow(false);
    setMemeberIdShow(true);
    setFilterShow(false);
  };
  const filterShowHandler = () => {
    setOrderIdShow(false);
    setMemeberIdShow(false);
    setFilterShow(true);
  };

  const getAllDataHandler = ()=>{

    const query = '?sort=-createdAt'

    dispatch(findOrders(query));
    setSearchParams(query);
    setPageNumber(1)
    setOrderIdShow(false);
    setMemeberIdShow(false);
    setFilterShow(false);
    setPageCountState(0)
    
  }

  //filter with id
  // filter with member
  // filter with date
  // filter with delivery status

  return (
    <div className={classes.wrapper}>
      <div className={classes.search_bar}>
        <div>
          <button className="btn_adn" onClick={orderShowHandler}>order Id</button>
        </div>
        <div>
          <button className="btn_adn"  onClick={memberShowHandler}>member id</button>
        </div>
        <div>
          <button className="btn_adn"  onClick={filterShowHandler}>filter </button>
        </div>
        <div>
          <button className="btn_adn"  onClick={getAllDataHandler}>get all</button>
        </div>
      </div>
      <div className={classes.filter_box}>
        {orderIdShow && (
          <form
            className={classes.filter_orderId_form}
            onSubmit={orderIdSubmitHandler}
          >
            <div>
              <label>
                order id
                <input type="text" ref={orderIdRef} className={classes.input__text}/>
              </label>
              <button className="btn_adn" >find</button>
            </div>
          </form>
        )}
        {memberIdShow && (
          <form
            className={classes.filter_memberId_form}
            onSubmit={memberIdSubmitHandler}
          >
            <div>
              <label>
                member id
                <input type="text" ref={memberIdRef} className={classes.input__text}/>
              </label>
              <button className="btn_adn">find</button>
            </div>
          </form>
        )}
        {filterShow && (
          <form
            className={classes.filter_op_form}
            onSubmit={filterSubmitHandler}
          >
            <div>
              <label>
                start date
                <input type="date" onChange={startDateChangeHandler}  className={classes.input__text} />
              </label>
            </div>
            <div>
              {startDate && (
                <p className="p">
                  {startDate}{" "}
                  <span onClick={endStartDateHandler}>cancel start date</span>
                </p>
              )}
            </div>
            <div>
              <label>
                end date
                <input type="date" onChange={endDateChangeHandler} className={classes.input__text}/>
              </label>
            </div>
            <div>
              {endDate && (
                <p className="p">
                  {endDate}{" "}
                  <span onClick={endEndDateHandler}>cancel start date</span>
                </p>
              )}
            </div>

            <div>
              <label>
                delivery status
                <select
                  className={classes.select}
                  onChange={deliverySelectHandler}
                  
                >
                  <option value="all">All</option>
                  <option value="pending">pending</option>
                  <option value="delivered">delivered</option>
                </select>
              </label>
            </div>
            <button className="btn_adn">find</button>
          </form>
        )}
      </div>

      <table className={classes.table}>
        <thead className={classes.thead}>
          <tr>
            <th>order id</th>
            <th>total</th>
            <th>delivery</th>
            <th>payment</th>
            <th>date</th>
            <th>edit/view</th>
          </tr>
        </thead>
        <tbody className={classes.tbody}>
          {orders &&
            orders.length > 0 &&
            orders.map((or) => {
              return (
                <tr key={uuid()}>
                  <td>{or._id}</td>
                  <td>{or.total}</td>
                  <td>{or.delivery_status}</td>
                  <td>{or.payment_status}</td>
                  {/* <td>{or.createdAt ? new Date(or.createdAt) :''}</td> */}
                  <td>{(or.createdAt)}</td>
                  <td>
                    <Link to={`/auth/admin/orderDetail/${or._id}`}>view</Link>
                  </td>
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
  );
}

export default Orders;
