import React,{useState,useEffect} from 'react';
import ReactDOM from "react-dom";
import {useLocation,useNavigate} from 'react-router-dom'
import classes from './MemberAddressEditForm.module.css';
import {useSelector,useDispatch} from 'react-redux';
import {toggleEditFromAddressDisplay,editAddressOff} from '../../../reduxStore/user/uiSlice';
import useInput from "../../../hooks/use-input";
import {getUserInfo} from '../../../reduxStore/user/userSlice';
import {editMemberAddress,editStatus,shppingStatus,memberAddressError} from '../../../reduxStore/user/addressSlice';
function MemberAddressEditForm() {
   const addressDisplay = useSelector(state=>state.ui.editFromAddressList);
    const editResult = useSelector(editStatus)
    const navigate = useNavigate();
    const editAddress = useSelector((state) => state.ui.editAddress);
  
    
    useEffect(()=>{
       if(editResult && editResult==='success'&& !editAddress){
        navigate("/order/checkout");
       }
    },[editResult])

    const BackDrop = ({ addressDisplay }) => {
        const dispatch = useDispatch()
        const onBackDropClickHandler = ()=>{
          dispatch(toggleEditFromAddressDisplay())
        }
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
    
      const AddressFrom = ({ addressDisplay}) => {
        const [formError,setFormError] = useState(false);
        
        const  location = useLocation();
        const dispatch = useDispatch();
        const  editAddress = useSelector(state=>state.ui.editAddress);
        const userInfo = useSelector(getUserInfo);
        const [enteredId,setEnteredId] = useState('');
       
    
    
        useEffect(() => {
          
          
              if (editAddress && Object.keys(editAddress).length >0) {
                  resetNameInput(editAddress.name);
                  resetEmailInput(editAddress.email);
                  resetPhoneInput(String(editAddress.phoneNumber));
                  resetAddressInput(editAddress.address);
                  resetPlaceInput(editAddress.place);
                  resetCityInput(editAddress.city);
                  resetStateInput(editAddress.state);
                  resetPinInput(String(editAddress.pinCode));
                  setEnteredId(editAddress._id)
          
                
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
    
          dispatch(editMemberAddress(shippingAddress))
          dispatch(editAddressOff());
        
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
                <label htmlFor="Editfname">Full Name</label>
                <input
                  type="text"
                  id="Editfname"
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
                <label htmlFor="Editemail"> Email</label>
                <input
                  type="text"
                  id="Editemail"
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
                <label htmlFor="Editphone">Phone number</label>
                <input
                  type="number"
                  id="Editphone"
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
                <select id="Editcountry" name="country">
                  <option value="India">India</option>
                </select>
              </div>
              <div>
              <label htmlFor="Editaddress">Address</label>
                <input
                  type="text"
                  id="Editaddress"
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
              <label htmlFor="Editplace">place</label>
                <input
                  type="text"
                  id="Editplace"
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
              
                <label htmlFor="Editcity"> city</label>
                <input
                  type="text"
                  id="Editcity"
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
              <label htmlFor="Editstate">state</label>
                <input
                  type="text"
                  id="Editstate"
                  name="state"
                  placeholder="state"
                  className={stateInputClass}
                  value={enteredState}
                  onChange={stateChangeHandler}
                  onBlur={stateBlurHandler}
                />
              </div>
              {stateInputHasError && <p className="p">the state cannot be empty</p>}
              <div>
              <label htmlFor="Editpin">Pin number</label>
                <input
                  type="number"
                  id="Editpin"
                  name="pin"
                  placeholder="Postal Code"
                  className={pinInputClass}
                  value={enteredPin}
                  onChange={pinChangeHandler}
                  onBlur={pinBlurHandler}
                />
              </div>
              {pinInputHasError && <p className="p">the pin may incorrect</p>}
    
              <div className={classes.btn_block}>
                {/* <button className={classes.btn_shipping}>edit</button> */}
                <button className={classes.btn_shipping}>save and continue</button>
              </div>
              {formError &&  <p className="p">All requied field must be filled</p> }
              {/* {addressError && <p className="p">{addressError}</p>} */}
            </form>
          </div>
        );
      };

  return (
    <div className={classes.wrapper}>
    {ReactDOM.createPortal(
      <BackDrop addressDisplay={addressDisplay} />,
      document.getElementById("memberAddressEditBackdrop--root")
    )}
    {ReactDOM.createPortal(
      <AddressFrom addressDisplay={addressDisplay} />,
      document.getElementById("memberAddressEditForm--root")
    )}
  </div>
  )
}

export default MemberAddressEditForm
