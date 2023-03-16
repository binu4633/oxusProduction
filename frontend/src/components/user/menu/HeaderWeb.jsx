import React,{useState,useEffect} from "react";
import classes from "./HeaderWeb.module.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleCartMenu,
  toggleLoginMenu,
  toggleLogoutMenu,
  toggleMenu
} from "../../../reduxStore/user/uiSlice";

import { getUserInfo } from "../../../reduxStore/user/userSlice";
import bag from "../../../imageCl/bag.png";
import avthar from "../../../imageCl/avthar.svg";
import search from "../../../imageCl/search.svg";
import SearchBox from "../../../utils/SearchBox";
import logo from '../../../imageCl/logo.svg'

function HeaderWeb() {
  const dispatch = useDispatch();
  const badge = useSelector((state) => state.cart.totalQty);
  const userInfo = useSelector((state) => state.user.userInfo);

  // console.log("usssss", userInfo);
  const [mobileSearchDisplay,setMobileSearchDisplay] = useState(false);
  const [menuOn,setMenuOn] = useState(false)

  const signinMenuHandler = () => {
    // console.log("siginin menu clicked");
    dispatch(toggleLoginMenu());
  };
  const cartMenuHandler = () => {
    dispatch(toggleCartMenu());
  };

  const userInfoHandler = () => {
    dispatch(toggleLogoutMenu());
  };
const onMobileSearchHandler = ()=>{
  setMobileSearchDisplay(!mobileSearchDisplay)
}

const onMenuHandler =()=> {
  setMenuOn(!menuOn);
  dispatch(toggleMenu())
}
  // if (userInfo.image) {
  //   console.log("somet thing happensss");
  // }



  return (
    <div className={classes.headerBar}>
      <div className={classes.header__wrapper}>
      <div>
        <ul className={classes.nav_list}>
          <li>
            <button className={classes.menu} onClick={onMenuHandler}>
              <div className={classes.bar} style={{transform:menuOn? "translateX(10px)" :"translateX(0px)"}}></div>
              <div className={classes.bar} style={{transform:menuOn?"translateX(5px)" : "translateX(0px)"}}></div>
              <div className={classes.bar}></div>
            </button>
          </li>
          <li>
            <NavLink to="/" >
              {/* Home */}
              <div className={classes.logo__div}>
                <img src={logo} alt="" />
              </div>

            </NavLink>
          </li>
          <li>
            <button className={ classes.btn_collection} onClick={onMenuHandler}>collection</button>
          </li>
         
          {userInfo && userInfo.isAdmin && (
            <li>
              <NavLink to="/auth/admin" activeClassName={classes.active}>
                admin
              </NavLink>
            </li>
          )}
         
           
       
        </ul>
      </div>

      

      <div className={classes.search__icon}>
        {/* <img src={search} alt="" /> */}
        <SearchBox />
      </div>
      <div className={classes.search__icon__mobile} onClick={onMobileSearchHandler}>
        <img src={search} alt="" />
        {/* <SearchBox /> */}
      </div>

      <div className={classes.header_cart_options}>
        {!userInfo && (
          <button className={classes.avthar} onClick={signinMenuHandler}>
            <div>
              <div className={classes.avthar__img}>
                <img src={avthar} alt="" />
              </div>
              <div className={classes.avthar__text}>signin</div>
            </div>
          </button>
        )}
        {userInfo && (
          <button className={classes.avthar} onClick={userInfoHandler}>
            <div>
              <div className={classes.avthar__img}>
                {userInfo && userInfo.image && (
                  <img src={userInfo.image} alt="" />
                )}
                {!userInfo.image && <img src={avthar} alt="" />}
              </div>

              <div className={classes.avthar__text}>{userInfo.name}</div>
            </div>
          </button>
        )}
        <button className={classes.btn_cart_menu} onClick={cartMenuHandler}>
          <div className={classes.cart}>
            <div className={classes.bag__wrapper}>
              <div className={classes.bag__img}>
                <img src={bag} alt="" />
              </div>
              <div className={classes.bag__text}>bag</div>
            </div>
            <div className={classes.badge}>{badge}</div>

            {/* <span>{badge}</span> */}
          </div>
        </button>
        {/* <div className={classes.menu}>
          <div className={classes.menu_open}>
            <div className={classes.menu_open_1}></div>
            <div className={classes.menu_open_2}></div>
            <div className={classes.menu_open_3}></div>
          </div>
          <div className={classes.menu_close}>
            <div className={classes.menu_close_1}></div>
            <div className={classes.menu_close_2}></div>
          </div>
        </div> */}
      </div>

      {/* <div>
        <img src={userInfo.image} alt="" />
      </div> */}
    </div>
    {mobileSearchDisplay &&
       <div className={classes.mobile__search__wrapper}>
       <SearchBox />
       </div>
    }
   
    </div>
  );
}

export default HeaderWeb;
