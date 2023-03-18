import React from 'react';
import ReactDOM from 'react-dom/client';
import Cookies from 'js-cookie'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import { GoogleOAuthProvider } from '@moeindana/google-oauth';
import {store} from './reduxStore/store';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// const stripePromise = loadStripe(`${process.env.STRIPE_PUBLISHABLE}`);
const stripePromise = loadStripe('pk_test_51M3YgASEpbl1n1XuiPYdD9kZ2jJko30PkTR6sgdlEnIX9vlXsUURJdb4Zy3ZzUizoiNSpDmbBfa9lRIKVecKI1vr00c5wlF6iq');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId="680514359613-5rk47km896dl4gf0521lhc10vm83grm9.apps.googleusercontent.com">
    {/* <GoogleOAuthProvider clientId="680514359613-b1kcm8fjd6it4jijhnt36co2m3470lah.apps.googleusercontent.com"> */}
    {/* <GoogleOAuthProvider clientId="680514359613-1d1aub80vee0g8q3pk1a8mo3m4t5epsa.apps.googleusercontent.com"> */}
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Provider>
    </GoogleOAuthProvider>
  </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// console.log('cokkiees', document.cookie.userInfo);
//   const user = Cookies.get('userInfo');
//   console.log('user', user.split(';'))

// console.log('cokkiees', document.cookie);
// if (!localStorage.getItem('userInfo')) {
//   // populateStorage();
//   console.log('the user info in local storage not availble');
// } else {
//   // setStyles();
//   console.log('the user info  availble in local storage');
// }