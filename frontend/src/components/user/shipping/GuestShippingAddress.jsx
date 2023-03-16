import React, { useEffect, useState,useRef } from "react";
import ReactDOM from "react-dom";
import classes from "./GuestShippingAddress.module.css";
import useInput from "../../../hooks/use-input";
import { useDispatch, useSelector } from "react-redux";
import { toggleGuestAddressDisplay } from "../../../reduxStore/user/uiSlice";
import { useNavigate, useLocation } from "react-router-dom";
import {
  calculateShippingCharge,
  shppingError,
  getShippingCharge,
  shppingStatus,
  addAddress,
  getShippingAddress,
} from "../../../reduxStore/user/addressSlice";

import { addShippingCharge } from "../../../reduxStore/user/cartSlice";
import {
  shippingPinCheck,
  errorPin,
  pinStatus,
  getPinShipResult,
} from "../../../reduxStore/user/pinShippingSlice";
import { editAddressOff,addShippigPath } from "../../../reduxStore/user/uiSlice";

function GuestShippingAddress() {
  const dispatch = useDispatch();
  const addressDisplay = useSelector((state) => state.ui.guestAddressDisplay);
  const shippingAddress = useSelector(getShippingAddress);
  let location = useLocation();
  const navigate = useNavigate();


//   useEffect(()=>{
//     dispatch(addShippigPath(location.pathname))
//   },[])

// useEffect(()=>{
//       if(Object.keys(shippingAddress).length >0){
//         // navigate("/order/checkout");
//     
//       }  
// },[])

  const onBackDropClickHandler = () => {
    dispatch(toggleGuestAddressDisplay());
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

  const AddressFrom = ({ addressDisplay }) => {
    const navigate = useNavigate();
    const  location = useLocation();
    const addressRef = useRef('')
    // const error = useSelector(shppingError);
    // const shippingCharge = useSelector(getShippingCharge);
    // const stats = useSelector(shppingStatus);


    const editAddress = useSelector((state) => state.ui.editAddress);
    const pinResult = useSelector(getPinShipResult);
    const stats = useSelector(pinStatus);
    const error = useSelector(errorPin);
    const address = useSelector(getShippingAddress);

    const totalQty = useSelector((state) => state.cart.totalQty);



    const [enteredShippingAddress, setEnteredShippingAddress] = useState("");

  

    useEffect(() => {
     
        const dispatchTrigger = {
            address:true
           }

          
        //  if(Object.keys(enteredShippingAddress).length >0 ||  ) {  }
      
    
            if (!editAddress&& stats != 'loading' && pinResult && pinResult.status === "success") {
               
              
                navigate("/order/checkout");
                if (dispatchTrigger.address) {
                 if(Object.keys(addressRef.current).length >0){
                    
                     dispatch(addAddress(addressRef.current));
                     return () => {
                        dispatchTrigger.address = false
                      };
                 }
               
                }
        
               
              }
       
           
    
    }, [pinResult.status === "success",editAddress,stats]);
    useEffect(() => {
        if (Object.keys(address).length >0) {
      
  
          resetNameInput(address.name);
          resetEmailInput(address.email);
          resetPhoneInput(address.phoneNumber);
          resetAddressInput(address.address);
          resetAddressInput(address.address);
          resetPlaceInput(address.place);
          resetCityInput(address.city);
          resetStateInput(address.state);
          resetPinInput(address.pinCode);

  
        
        } else {
      
        }
      }, []);

    // useEffect(() => {
    //   if (shippingCharge && shippingCharge.status === "success") {

    //     let dispatchTrigger = {
    //         address:true,
    //         charge:true,
    //         display:true
    //     }

    //     navigate("/order/checkout");


    //     if(dispatchTrigger.address){

    //         dispatch(addAddress(enteredShippingAddress));
    //         return ()=>{
    //             dispatchTrigger.address = false
    //         }
    //     }
    //     if(dispatchTrigger.charge){

    //         dispatch(addShippingCharge(shippingCharge.shippingCharge))
    //         return ()=>{
    //             dispatchTrigger.charge = false
    //         }
    //     }

    //     if(dispatchTrigger.display){

    //         dispatch(toggleGuestAddressDisplay());

    //         return ()=>{
    //             dispatchTrigger.display = false
    //         }
    //     }

    //   }
    // }, [stats === "succeeded", shippingCharge,dispatch]);

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
    } = useInput((value) => value.toString().trim().length === 10);
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
    } = useInput((value) => value.toString().trim().length === 6);

    const shippingAddressSubmitHandler = (e) => {
      e.preventDefault();

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
      };
    //   setEnteredShippingAddress(shippingAddress);
   
       addressRef.current = shippingAddress
      dispatch(editAddressOff());
      dispatch(shippingPinCheck({ pin: enteredPin }));
      dispatch(addShippigPath(location.pathname))
   
      

      //    dispatch(gusetShippingAddress(shippingAddress))

      //   const shipObj = {
      //     totalQty,
      //     pin: enteredPin,
      //   };

   
      //   dispatch(calculateShippingCharge(shipObj));

    
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
          {nameInputHasError && <p className="p">the name cannot be empty</p>}
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
          {emailInputHasError && <p className="p">the email may incorrect</p>}
          <div>
          <label > phone number</label>
            <input
              type="number"
              placeholder="phone number"
              className={phoneInputClass}
              value={enteredPhone}
              onChange={phoneChangeHandler}
              onBlur={phoneBlurHandler}
            />
          </div>
          {phoneInputHasError && (
            <p className="p">the phone number must have 10 digit</p>
          )}
          <div>
          <label >country</label>
            <select id="country" name="country">
              <option value="India">India</option>
            </select>
          </div>
          <div>
          <label >address</label>
            <input
              type="text"
              id="adr"
              name="address"
              placeholder="address"
              className={addressInputClass}
              value={enteredAddress}
              onChange={addressChangeHandler}
              onBlur={addressBlurHandler}
            />
          </div>
          {addressInputHasError && (
            <p className="p">the address cannot be empty</p>
          )}
          <div>
          <label >place</label>
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
          {placeInputHasError && <p className="p">the place cannot be empty</p>}
          <div>
            {/* <label for="city"> City</label> */}
            <label >city</label>
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
          {cityInputHasError && <p className="p">the city cannot be empty</p>}
          <div>
          <label >state</label>
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
          {stateInputHasError && <p className="p">the state cannot be empty</p>}
          <div>
          <label >pin number</label>
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
          {pinInputHasError && <p className="p">the pin may incorrect</p>}
          {pinResult && pinResult.status === "unsuccess" && (
            <p className="p">{pinResult.result}</p>
          )}
          <div className={classes.btn_block}>
            {/* <button className={classes.btn_shipping}>edit</button> */}
            <button className={classes.btn_shipping}>save and continue</button>
            <button type="button" className={classes.btn_shipping}    onClick={onBackDropClickHandler}>cancel</button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className={classes.wrapper}>
      {ReactDOM.createPortal(
        <BackDrop addressDisplay={addressDisplay} />,
        document.getElementById("addressBackdrop--root")
      )}
      {ReactDOM.createPortal(
        <AddressFrom addressDisplay={addressDisplay} />,
        document.getElementById("addressForm--root")
      )}
    </div>
  );
}

export default GuestShippingAddress;
