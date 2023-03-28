import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import {
  findProfile,
  getProfile,
  profileStatus,
  profileError,
  resetPassword,
  resetResult,
  resetError,
  profileUpdate,
} from "../../../reduxStore/user/profileSlice";
import classes from "./Profile.module.css";
import Loader from "../../../utils/Loader";
function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector(getProfile);
  const apiStats = useSelector(profileStatus);
  const apiError = useSelector(profileError);
  const passResult = useSelector(resetResult);
  const passError = useSelector(resetError);

  const [resetDisplay, setResetDisplay] = useState(false);
  const [nameDisplay, setNameDisplay] = useState(false);
  const [imageDisplay, setImageDisplay] = useState(false);
  const [profileImage, setProfileImage] = useState();
  const [loading, setLoading] = useState(false);

  const oldPassRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();
  const nameRef = useRef();

  //  console.log('profile', profile)

  useEffect(() => {
    dispatch(findProfile());
  }, []);

  const onResetDisplay = () => {
    setResetDisplay(!resetDisplay);
  };
const onEditDisplay = ()=>{
    setNameDisplay(!nameDisplay)
}
  const onImageDisplay = () => {
    setImageDisplay(!imageDisplay);
  };

  const handleProfileImage = (e) => {
    const imageFile = e.target.files[0];

    // console.log(imageFile);
    tranformFile(imageFile);
  };

  function tranformFile(file) {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
    } else {
      setProfileImage("");
    }
  }

  const onProfileUpdateSubmitHandler = async (e) => {
    e.preventDefault();

    if (profileImage || nameRef.current.value) {
      
      setLoading(true);
    
      const payload = {
        profileImage: profileImage ? profileImage : "",
        name: nameRef.current.value,
      };

 

      const result = await dispatch(profileUpdate(payload));

      //   console.log('result', result)
      //   console.log('result data', result.data)
      //   console.log('result data payload', result.payload)

      if (result.payload.status === "success") {
        dispatch(findProfile());
        setImageDisplay(false);
        setProfileImage("");
      }
      if (result) {
        setLoading(false);
      
      }
    }
  };

  const resetPasswordSubmitHandler = (e) => {
    e.preventDefault();

    const excitingPass = oldPassRef.current.value;
    const newPass = passRef.current.value;
    const confirmNewPass = confirmPassRef.current.value;

 

    const payload = {
      excistingPassword: excitingPass,
      newPassword: newPass,
      confirmNewPassword: confirmNewPass,
    };

    dispatch(resetPassword(payload));
  };

  const onOrderDetail = (id) => {
  
    navigate(`/profileOrder/${id}`)
  };

  return (
    <div className={classes.wrapper}>
      {apiStats ==='loading' && <Loader />}
      {loading && <Loader />}
      {!loading && (
        <div className={classes.flex__wrapper}>
          {profile && (
            <div className={classes.element__wrapper}>
              <div>
                <p className="p_white">{profile.name}</p>
                <button className={classes.btn_p} onClick={onEditDisplay}>edit name</button>
              </div>
              {
                nameDisplay &&
                <div>
                <form onSubmit={onProfileUpdateSubmitHandler}>
                  <div className={classes.form__div}>
                    <label>
                      new name:
                      <input
                        type="text"
                        ref={nameRef}
                        className={classes.input}
                        ///////////////////////////////
                      />
                    </label>
                  </div>
                  <button className='btn_adn'>submit</button>
                </form>
              </div>
              }
           
              <div>
                <p className="p_white">{profile.email} </p>
              </div>
              {profile.image && (
                <div className={classes.element}>
                  <div className={classes.profile__image}>
                    <img src={profile.image} alt="" />
                  </div>
                </div>
              )}
              <div>
                <button className={classes.btn_p} onClick={onImageDisplay}>
                  {" "}
                  add/update image{" "}
                </button>
              </div>
              {imageDisplay && (
                <div>
                  {profileImage && (
                    <div className={classes.element}>
                      <div className={classes.profile__image}>
                        <img src={profileImage} alt="" />
                      </div>
                    </div>
                  )}

                  <div>
                    <form
                      className={classes.reset__form}
                      onSubmit={onProfileUpdateSubmitHandler}
                    >
                      <div className={classes.form__div}>
                        <label>
                          profile image:
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfileImage}
                          />
                        </label>
                      </div>
                      <button className='btn_adn'>submit</button>
                    </form>
                  </div>
                </div>
              )}

              <div>
                <button className={classes.btn_p} onClick={onResetDisplay}>
                  {" "}
                  reset password{" "}
                </button>
              </div>
              {resetDisplay && (
                <div>
                  <form
                    className={classes.reset__form}
                    onSubmit={resetPasswordSubmitHandler}
                  >
                    <div className={classes.form__div}>
                      <label>
                        <p className={classes.p}>exiscting password</p>

                        <input
                          type="password"
                          className={classes.input}
                          ref={oldPassRef}
                        />
                      </label>
                    </div>
                    <div className={classes.form__div}>
                      <label>
                        <p className={classes.p}> new password</p>

                        <input
                          type="password"
                          className={classes.input}
                          ref={passRef}
                        />
                      </label>
                    </div>
                    <div className={classes.form__div}>
                      <label>
                        <p className={classes.p}>confirm new password</p>

                        <input
                          type="password"
                          className={classes.input}
                          ref={confirmPassRef}
                        />
                      </label>
                    </div>
                    {passResult && <p className="p_white">{passResult}</p>}
                    {passError && <p className="p_white">{passError}</p>}
                    <button className={classes.btn__submit}>submit</button>
                  </form>
                </div>
              )}

              <p className="p_white"> last five orders </p>

              <div>
                {profile.order &&
                  profile.order.length > 0 &&
                  profile.order.map((or) => {
                    return (
                      <div className={classes.order__one}>
                        <p>{new Date(or.date).toLocaleDateString("en-GB")}</p>
                        <button onClick={onOrderDetail.bind(this,or.order)} className="btn_adn">
                          detail
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
