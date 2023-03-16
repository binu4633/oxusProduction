import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./HeaderLogin.module.css";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../../hooks/use-input";
import {
  userRegister,
  userLogin,
  forgetPassword,
  googleAuth,
} from "../../../reduxStore/user/userSlice";
import { toggleLoginMenu } from "../../../reduxStore/user/uiSlice";
import {
  getUserStatus,
  getUserInfo,
  loginError,
  signinError,
  forgoResult,
  forgoError

} from "../../../reduxStore/user/userSlice";
import Loader from "../../../utils/Loader";
import Glogin from "./Glogin";
function HeaderLogin() {
  const dispatch = useDispatch();

  const userInfo = useSelector(getUserInfo);
  const stats = useSelector(getUserStatus);
  const getLoginError = useSelector(loginError);
  const getSigninError = useSelector(signinError);

  const forgo = useSelector(forgoResult);
  const forgoErr = useSelector(forgoError);



  const loginMenuActive = useSelector((state) => state.ui.loginMenu);
  //    console.log('login active',loginMenuActive)
  const [doLogin, setDoLogin] = useState(true);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);

  //   if(stats === 'succeeded' && userInfo){
  //     dispatch(toggleLoginMenu())
  //   }

  // console.log('stas', stats)
  // console.log('useinf', userInfo);
  // console.log('errrr', error)

  useEffect(() => {
    if (stats === "succeeded" && userInfo) {
      dispatch(toggleLoginMenu());
    }
  }, [stats, userInfo]);

  const doSigninHandler = () => {
    setDoLogin(false);
  };
  const doLoginHanlder = () => {
    setDoLogin(true);
  };

  const backdropClickHandler = () => {
    dispatch(toggleLoginMenu());
  };

  const BackDrop = () => {
    return (
      <div
        className={classes.backdrop}
        onClick={backdropClickHandler}
        style={{ display: loginMenuActive ? "block" : "none" }}
      ></div>
    );
  };

  const LoginModal = () => {

   
    const {
      value: enteredEmail,
      isValid: enteredEmailIsValid,

      valueChangeHandler: emailChangeHandler,

      reset: resetEmailInput,
    } = useInput((value) => value.trim() !== "");

    const {
      value: enteredPassword,
      isValid: enteredPasswordIsValid,

      valueChangeHandler: passwordChangeHandler,
      // inputBlurHanlder: UserNameBlurHandler,
      reset: resetPasswordInput,
    } = useInput((value) => value.trim() !== "");

    const loginHandler = (e) => {
      e.preventDefault();

      if (enteredPasswordIsValid && enteredEmailIsValid) {
        const newUser = {
          email: enteredEmail,
          password: enteredPassword,
        };

        //   console.log('login user', newUser)

        dispatch(userLogin(newUser));
      }

      resetEmailInput();
      resetPasswordInput();
    };

    const forgetPasswordHandler = ()=>{
       if(!enteredEmail){
        return
      }

     dispatch(forgetPassword({email:enteredEmail}));

    //  console.log('forget response', response);
    // if(response.payload.message){
    //   setForgetResponse(response.payload.message)
    // }
 
    }

    const {
      value: enteredSignInEmail,
      isValid: enteredsignInEmailIsValid,

      valueChangeHandler: emailsignInChangeHandler,

      reset: resetsignInEmailInput,
    } = useInput((value) => value.trim() !== "");
    const {
      value: enteredSignInName,
      isValid: enteredsignInNameIsValid,

      valueChangeHandler: namesignInChangeHandler,

      reset: resetsignInNameInput,
    } = useInput((value) => value.trim() !== "");

    const {
      value: enteredsignInPassword,
      isValid: enteredsignInPasswordIsValid,

      valueChangeHandler: passwordsignInChangeHandler,
      // inputBlurHanlder: UserNameBlurHandler,
      reset: resetsignInPasswordInput,
    } = useInput((value) => value.trim() !== "");
    const {
      value: enteredsignInConfirmPassword,
      isValid: enteredsignInPasswordConfirmIsValid,

      valueChangeHandler: passwordConfirmsignInChangeHandler,
      // inputBlurHanlder: UserNameBlurHandler,
      reset: resetsignInPasswordConfirmInput,
    } = useInput((value) => value.trim() !== "");

    const signInHandler = (e) => {
      e.preventDefault();

      if (
        enteredsignInEmailIsValid &&
        enteredsignInPasswordIsValid &&
        enteredsignInNameIsValid &&
        enteredsignInConfirmPassword
      ) {
        if (enteredsignInPassword !== enteredsignInConfirmPassword) {
          setPasswordConfirmError(true);
        } else {
          setPasswordConfirmError(false);

          const newUser = {
            name: enteredSignInName,
            email: enteredSignInEmail,
            password: enteredsignInPassword,
          };
          //   console.log('signin user', newUser)

          dispatch(userRegister(newUser));

          resetsignInEmailInput();
          resetsignInPasswordInput();
          resetsignInNameInput();
          resetsignInPasswordConfirmInput();
        }
      }
    };
    return (
      <div
        className={classes.wrapper}
        style={{ display: loginMenuActive ? "block" : "none" }}
      >
        {stats === "loading" && <Loader />}
        <div className={classes.absulte_wrapper}>
          <div className={classes.login_box}>
            <div className={classes.login_goole}>
              {/* <button>
           
              <p>login with google</p>
            </button> */}
              <Glogin />
            </div>
            {doLogin && (
              <div className={classes.login}>
                <div className={classes.login_header}>
                  <p className="p">login</p>
                </div>
                <form className={classes.form__siginin} onSubmit={loginHandler}>
                  <div>
                    <label>
                      Email <br />
                      <input
                        type="email"
                        onChange={emailChangeHandler}
                        value={enteredEmail}
                      />
                    </label>
                  </div>

                  <div>
                    <label>
                      password <br />
                      <input
                        type="password"
                        onChange={passwordChangeHandler}
                        value={enteredPassword}
                      />
                    </label>
                  </div>

                  <button className={classes.btn_signin}>Login</button>
                </form>
                {getLoginError && <p className={classes.p_black}>{getLoginError}</p> } 
                <button className={classes.btn_link} onClick={doSigninHandler}>
                  <p>Create an account, signin</p>
                </button><br/>
                <button type="button" className={classes.btn_link} onClick={forgetPasswordHandler}>
                  <p>forget password</p>
                </button>
               {forgo && <p className={classes.p_black}>{forgo}</p> }   
               {forgoErr && <p className={classes.p_black} >{forgoErr}</p> }   
              </div>
            )}
            {!doLogin && (
              <div className={classes.login}>
                <div className={classes.login_header}>
                  <p className="p">sign in</p>
                </div>
                <form
                  className={classes.form__siginin}
                  onSubmit={signInHandler}
                >
                  <div>
                    <label>
                      name <br />
                      <input
                        type="text"
                        onChange={namesignInChangeHandler}
                        value={enteredSignInName}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Email <br />
                      <input
                        type="email"
                        onChange={emailsignInChangeHandler}
                        value={enteredSignInEmail}
                      />
                    </label>
                  </div>

                  <div>
                    <label>
                      password <br />
                      <input
                        type="password"
                        onChange={passwordsignInChangeHandler}
                        value={enteredsignInPassword}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      confirm password <br />
                      <input
                        type="password"
                        onChange={passwordConfirmsignInChangeHandler}
                        value={enteredsignInConfirmPassword}
                      />
                    </label>
                  </div>

                  <button className={classes.btn_signin}>sign in</button>
                </form>
                {getSigninError && <p className="p">{getSigninError}</p>}
                {passwordConfirmError && <p className="p">password mismatch</p>}
                <button className={classes.btn_link} onClick={doLoginHanlder}>
                  <p>have an account login</p>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop />,
        document.getElementById("backDrop-root")
      )}
      {ReactDOM.createPortal(
        <LoginModal />,
        document.getElementById("modal-root")
      )}
    </>
  );
}

export default HeaderLogin;
