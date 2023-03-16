import React, { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);

  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const inputBlurHanlder = () => {
    setIsTouched(true);
  };

  const reset = ()=>{
    setEnteredValue('');
    setIsTouched(false)
  }
  const resetAddress = (value)=>{
    setEnteredValue(value);
    setIsTouched(false)
  }

  return {
    value: enteredValue,
    isValid:valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHanlder,
    reset,
    resetAddress
  };
};

export default useInput;
