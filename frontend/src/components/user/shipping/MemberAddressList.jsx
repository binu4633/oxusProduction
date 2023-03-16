import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import uuid from 'react-uuid';
import classes from "./MemberAddressList.module.css";

import {
  fetchAddressList,
  getShippingAddressList,
  shppingStatus,
  addressListError,
  addAddress,
  deleteMemberAddress,
  deleteResult,
  deleteError
} from "../../../reduxStore/user/addressSlice";
import {
  editAddressOff,
  addShippigPath,
  toggleEditFromAddressDisplay,
  editFromAddressListOn,
  editListAddress
} from "../../../reduxStore/user/uiSlice";
import {toggleMemberAddressDisplay} from '../../../reduxStore/user/uiSlice';
function MemberAddressList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchAddressList());
  }, []);



  const addressList = useSelector(getShippingAddressList);
  const status = useSelector(shppingStatus);
  const addressError = useSelector(addressListError);

  const deleteListResult = useSelector(deleteResult);
  const deleteListError = useSelector(deleteError);


  useEffect(()=>{
    if(deleteListResult ==='success'){
      dispatch(fetchAddressList());
    }
  },[deleteListResult])
  const onSelectHandler = (id) => {
    const selectedAddress = addressList.filter((ad) => ad._id === id)[0];
    //    console.log('selected addess', selectedAddress)

    dispatch(addAddress(selectedAddress));
    dispatch(addShippigPath(location.pathname));
    navigate("/order/checkout");
  };

  const onEditFromList = (id)=>{
    const selectedAddress = addressList.filter((ad) => ad._id === id)[0];
    dispatch(toggleEditFromAddressDisplay());
    dispatch(editListAddress(selectedAddress));
    // dispatch(editFromAddressListOn());
    dispatch(addShippigPath(location.pathname));
  }

  const onDeleteFromList = (id)=>{
     dispatch(deleteMemberAddress({_id:id}));

  }

  return (
    <div className={classes.wrapper}>
      {deleteListError &&  <p className="p">{deleteListError}</p>}
     
      {addressList &&
        addressList.length > 0 &&
        addressList.map((ad) => {
          return (
            <div className={classes.address__block} key={uuid()}>
              <div>
                <p className="p">{ad.name}</p>
                <p className="p">{ad.email}</p>
                <p className="p">{ad.phoneNummber}</p>
                <p className="p">{ad.address}</p>
                <p className="p">{ad.place}</p>
                <p className="p">{ad.city}</p>
                <p className="p">{ad.state}</p>
                <p className="p">{ad.pinCode}</p>
              </div>
              <div className={classes.btn__group}>
                <button onClick={onSelectHandler.bind(this, ad._id)}>
                  select
                </button>
                <button onClick={onEditFromList.bind(this, ad._id)}>
                  edit
                </button>
                <button onClick={onDeleteFromList.bind(this,ad._id)}>delete</button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default MemberAddressList;
