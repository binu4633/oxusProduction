import React,{useState,useEffect} from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "./MemberShipAddressForm.module.css";
import { toggleMemberAddressDisplay } from "../../../reduxStore/user/uiSlice";
import useInput from "../../../hooks/use-input";
import {addMemberAddress,editMemberAddress} from '../../../reduxStore/user/addressSlice';
import {getUserInfo} from '../../../reduxStore/user/userSlice';
import {getShippingAddress,shppingStatus,memberAddressError} from '../../../reduxStore/user/addressSlice';
import { editAddressOff,addShippigPath } from "../../../reduxStore/user/uiSlice";
function MemberShipAddressForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addressDisplay = useSelector((state) => state.ui.memberAddressDisplay);
  const userInfo = useSelector(getUserInfo);
  const shippingAddress = useSelector(getShippingAddress);
  const addressStats = useSelector(shppingStatus);
  const addressError = useSelector(memberAddressError);
  const editAddress = useSelector((state) => state.ui.editAddress);
//   console.log('shipping address', addressError)

  useEffect(()=>{
    // console.log('does this portion worksss')
     if(shippingAddress && !editAddress && !addressError){
        if(Object.keys(shippingAddress).length >0){
            // console.log('shippingAddress inside useefect', shippingAddress)
            // console.log('shippingAddress inside useefect error', addressError)
            navigate("/order/checkout");
        }
       
     }
  },[shippingAddress,editAddress])

  const onBackDropClickHandler = () => {
    dispatch(toggleMemberAddressDisplay());
  };

  const BackDrop = ({ addressDisplay }) => {
    return (
      <div
        className={classes.backdrop}
        style={{ display: addressDisplay ? "block" : "none" }}
        onClick={onBackDropClickHandler}
      >
        {" "}
      </div>
    );
  };

  const AddressFrom = ({ addressDisplay,editAddress}) => {
    const [formError,setFormError] = useState(false);
    
    const  location = useLocation();
    const dispatch = useDispatch();
    const [enteredId,setEnteredId] = useState('');
   


    useEffect(() => {
      
      
          if (shippingAddress && Object.keys(shippingAddress).length >0) {
            //   console.log("the address is found", shippingAddress);
            //   console.log( 'pin type' ,typeof(shippingAddress.pinCode))
              resetNameInput(shippingAddress.name);
              resetEmailInput(shippingAddress.email);
              resetPhoneInput(String(shippingAddress.phoneNumber));
              resetAddressInput(shippingAddress.address);
              resetPlaceInput(shippingAddress.place);
              resetCityInput(shippingAddress.city);
              resetStateInput(shippingAddress.state);
              resetPinInput(String(shippingAddress.pinCode));
              setEnteredId(shippingAddress._id)
      
            
            } else {
                resetNameInput(userInfo ? userInfo.name?userInfo.name :'':'');
                resetEmailInput(userInfo ? userInfo.email?userInfo.email :'':'');
            }
    
      
      }, []);
  

    const {
      value: enteredName,
      isValid: enteredNameIsValid,
      hasError: nameInputHasError,
      valueChangeHandler: nameChangeHandler,
      inputBlurHanlder: nameBlurHandler,
      resetAddress: resetNameInput,
    } = useInput((value) => value.trim() !== "");
    const {
      value: enteredEmail,
      isValid: enteredEmailIsValid,
      hasError: emailInputHasError,
      valueChangeHandler: emailChangeHandler,
      inputBlurHanlder: emailBlurHandler,
      resetAddress: resetEmailInput,
    } = useInput((value) => value.trim().includes("@"));
    const {
      value: enteredPhone,
      isValid: enteredPhoneIsValid,
      hasError: phoneInputHasError,
      valueChangeHandler: phoneChangeHandler,
      inputBlurHanlder: phoneBlurHandler,
      resetAddress: resetPhoneInput,
    } = useInput((value) => value.trim().length === 10);
    const {
      value: enteredAddress,
      isValid: enteredAddressIsValid,
      hasError: addressInputHasError,
      valueChangeHandler: addressChangeHandler,
      inputBlurHanlder: addressBlurHandler,
      resetAddress: resetAddressInput,
    } = useInput((value) => value.trim() !== "");
    const {
      value: enteredPlace,
      isValid: enteredPlaceIsValid,
      hasError: placeInputHasError,
      valueChangeHandler: placeChangeHandler,
      inputBlurHanlder: placeBlurHandler,
      resetAddress: resetPlaceInput,
    } = useInput((value) => value.trim() !== "");
    const {
      value: enteredCity,
      isValid: enteredCityIsValid,
      hasError: cityInputHasError,
      valueChangeHandler: cityChangeHandler,
      inputBlurHanlder: cityBlurHandler,
      resetAddress: resetCityInput,
    } = useInput((value) => value.trim() !== "");
    const {
      value: enteredState,
      isValid: enteredStateIsValid,
      hasError: stateInputHasError,
      valueChangeHandler: stateChangeHandler,
      inputBlurHanlder: stateBlurHandler,
      resetAddress: resetStateInput,
    } = useInput((value) => value.trim() !== "");
    const {
      value: enteredPin,
      isValid: enteredPinIsValid,
      hasError: pinInputHasError,
      valueChangeHandler: pinChangeHandler,
      inputBlurHanlder: pinBlurHandler,
      resetAddress: resetPinInput,
    } = useInput((value) => value.trim().length === 6);
  


    

    const shippingAddressSubmitHandler = (e) => {
      e.preventDefault();

      if(!enteredName || !enteredEmail || !enteredPhone || !enteredAddress || !enteredPlace || !enteredCity
        || !enteredState || !enteredPin){
            setFormError(true)
            return
        }

      const shippingAddress = {
        name: enteredName,
        email: enteredEmail,
        phoneNumber: enteredPhone,
        country: "india",
        address: enteredAddress,
        place: enteredPlace,
        city: enteredCity,
        state: enteredState,
        pinCode: enteredPin,
        _id:enteredId
      };
      const shippingAddressAdd = {
        name: enteredName,
        email: enteredEmail,
        phoneNumber: enteredPhone,
        country: "india",
        address: enteredAddress,
        place: enteredPlace,
        city: enteredCity,
        state: enteredState,
        pinCode: enteredPin,
      
      };

    //  console.log('the shipping address', shippingAddress);
    //  console.log('pin type jajjaj' ,typeof(enteredPin))
   
    //  if(editAddress){
    //     console.log('these edit portin workds here ');
    //    dispatch(editMemberAddress(shippingAddress));
    //    dispatch(editAddressOff());
       
    //  }else{
    //     console.log('these add portin works here');
    //     dispatch(addMemberAddress(shippingAddress));
    //     dispatch(editAddressOff());
    //  }
     dispatch(addMemberAddress(shippingAddress));
     dispatch(editAddressOff());
     dispatch(addShippigPath(location.pathname));
    
    };

  
   
    const nameInputClass = !nameInputHasError
      ? "form-controller-shipping"
      : "form-controller-shipping__invalid";
    const emailInputClass = !emailInputHasError
      ? "form-controller-shipping"
      : "form-controller-shipping__invalid";
    const phoneInputClass = !phoneInputHasError
      ? "form-controller-shipping"
      : "form-controller-shipping__invalid";
    const addressInputClass = !addressInputHasError
      ? "form-controller-shipping"
      : "form-controller-shipping__invalid";
    const placeInputClass = !placeInputHasError
      ? "form-controller-shipping"
      : "form-controller-shipping__invalid";
    const stateInputClass = !stateInputHasError
      ? "form-controller-shipping"
      : "form-controller-shipping__invalid";
    const cityInputClass = !cityInputHasError
      ? "form-controller-shipping"
      : "form-controller-shipping__invalid";
    const pinInputClass = !pinInputHasError
      ? "form-controller-shipping"
      : "form-controller-shipping__invalid";

    return (
      <div
        className={classes.shipping_address_main}
        style={{ display: addressDisplay ? "block" : "none" }}
      >
        <h3>shipping address</h3>

        <form
          className={classes.shipping_addres_form}
          onSubmit={shippingAddressSubmitHandler}
        >
          <div>
            <label htmlFor="fname">Full Name</label>
            <input
              type="text"
              id="fname"
              name="firstname"
              placeholder="Full name"
              className={nameInputClass}
              value={enteredName}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
            />
          </div>
          {nameInputHasError && <p className="p_white">the name cannot be empty</p>}
          <div>
            <label htmlFor="email"> Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="email"
              className={emailInputClass}
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
          </div>
          {emailInputHasError && <p className="p_white">the email may incorrect</p>}
          <div>
            <label htmlFor="phone">Phone number</label>
            <input
              type="number"
              id="phone"
              placeholder="phone number"
              className={phoneInputClass}
              value={enteredPhone}
              onChange={phoneChangeHandler}
              onBlur={phoneBlurHandler}
            />
          </div>
          {phoneInputHasError && (
            <p className="p_white">the phone number must have 10 digit</p>
          )}
          <div>
            <select id="country" name="country">
              <option value="India">India</option>
            </select>
          </div>
          <div>
          <label htmlFor="address">Address</label>
            <input
              type="text"
              id="adress"
              name="address"
              placeholder="address"
              className={addressInputClass}
              value={enteredAddress}
              onChange={addressChangeHandler}
              onBlur={addressBlurHandler}
            />
          </div>
          {addressInputHasError && (
            <p className="p_white">the address cannot be empty</p>
          )}
          <div>
          <label htmlFor="place">place</label>
            <input
              type="text"
              id="place"
              name="place"
              placeholder="place"
              className={placeInputClass}
              value={enteredPlace}
              onChange={placeChangeHandler}
              onBlur={placeBlurHandler}
            />
          </div>
          {placeInputHasError && <p className="p_white">the place cannot be empty</p>}
          <div>
          
            <label htmlFor="city"> city</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="city"
              className={cityInputClass}
              value={enteredCity}
              onChange={cityChangeHandler}
              onBlur={cityBlurHandler}
            />
          </div>
          {cityInputHasError && <p className="p_white">the city cannot be empty</p>}
          <div>
          <label htmlFor="state">state</label>
            <input
              type="text"
              id="state"
              name="city"
              placeholder="state"
              className={stateInputClass}
              value={enteredState}
              onChange={stateChangeHandler}
              onBlur={stateBlurHandler}
            />
          </div>
          {stateInputHasError && <p className="p_white">the state cannot be empty</p>}
          <div>
          <label htmlFor="pin">Pin number</label>
            <input
              type="number"
              id="pin"
              name="pin"
              placeholder="Postal Code"
              className={pinInputClass}
              value={enteredPin}
              onChange={pinChangeHandler}
              onBlur={pinBlurHandler}
            />
          </div>
          {pinInputHasError && <p className="p_white">the pin may incorrect</p>}

          <div className={classes.btn_block}>
            {/* <button className={classes.btn_shipping}>edit</button> */}
            <button className={classes.btn_shipping}>save and continue</button>
            <button type="button" className={classes.btn_shipping}   onClick={onBackDropClickHandler}>cancel</button>
          </div>
          {formError &&  <p className="p_white">All requied field must be filled</p> }
          {addressError && <p className="p_white">{addressError}</p>}
        </form>
      </div>
    );
  };

  return (
    <div className={classes.wrapper}>
      {ReactDOM.createPortal(
        <BackDrop addressDisplay={addressDisplay} />,
        document.getElementById("memberAddressBackdrop--root")
      )}
      {ReactDOM.createPortal(
        <AddressFrom addressDisplay={addressDisplay} editAddress={editAddress}/>,
        document.getElementById("memberAddressForm--root")
      )}
    </div>
  );
}

export default MemberShipAddressForm;
