import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Tooltip from "./Tooltip";
import {
  isValidLength,
  isContainsUppercase,
  isContainsLowercase,
  isContainsNumber,
  isContainsSymbol,
} from "../passwordValidation";
import { useTranslation } from "react-i18next";
import { checkIcon, crossIcon } from "../icons";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Axios from "axios";

// imported icons from Font Awesome;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { faGooglePlusSquare } from "@fortawesome/free-brands-svg-icons";

library.add(faFacebookSquare, faTwitterSquare, faGooglePlusSquare);

function SignupForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    return user ? navigate("/dashboard") : null;
  });
  function onSubmit(data, event) {
    event.preventDefault();
    console.log(data);
    // calling the API by axios.

    let response = () => {
      console.log("SignUp Form");
      // return new Promise(function (resolve, reject) {
      // console.log(fields);
      Axios.post("http://localhost:8081/nodeApi/user/save", {
        name: inputValues.name,
        email: inputValues.email,
        password: password,
      }).then(() => {
        setUserSignupDetail({ email: inputValues.email, password: password });
        console.log("success");
      });
      // }).catch((err) => {
      //   console.log(err);
      // });
    };
    let responseData = response();
    console.log(responseData);

    event.target.reset();
    setPassword("");
  }

  // const onSubmit = (e) => {
  //   e.target.reset(); // reset after form submit
  // };

  const [validationRules, setValidationRules] = useState({
    validLength: false,
    containsUppercase: false,
    containsLowercase: false,
    containsNumber: false,
    containsSymbol: false,
  });

  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  // initialized value of false from useState to show variable and setShow function of type const

  const [show, setShow] = useState(false);

  const [show1, setShow1] = useState(false);

  // used destructuring to insert value from useTranslation to variable t and i18n of type const

  const { t, i18n } = useTranslation();

  const [userSignupDetail, setUserSignupDetail] = useState({});

  // Password regex
  const [password, setPassword] = useState("");

  //function handlePassword

  function handlePassword(e) {
    let new_Password = e.target.value;
    console.log(new_Password);
    let newObj = { ...validationRules };
    if (new_Password.length >= 8) {
      newObj.validLength = true;
    } else {
      newObj.validLength = false;
    }

    if (isContainsLowercase.test(new_Password)) {
      newObj.containsLowercase = true;
    } else {
      newObj.containsLowercase = false;
    }

    if (isContainsUppercase.test(new_Password)) {
      newObj.containsUppercase = true;
    } else {
      newObj.containsUppercase = false;
    }

    if (isContainsNumber.test(new_Password)) {
      newObj.containsNumber = true;
    } else {
      newObj.containsNumber = false;
    }

    if (isContainsSymbol.test(new_Password)) {
      newObj.containsSymbol = true;
    } else {
      newObj.containsSymbol = false;
    }

    setValidationRules(newObj);
    setPassword(new_Password);
  }

  // function handleShowHide
  const handleShowHide = () => {
    setShow(!show);
  };

  // const handleShowHide1 = () => {
  //   setShow1(!show1);
  // };

  return (
    //created section tag
    <section>
      <div className="main d-flex justify-content-center align-items-center py-5 my-5">
        <div className="container d-flex justify-content-center align-items-center rounded my-2 ">
          <div className="row my-2 border">
            <div className="col-md-6 col-sm-12 col-12 col-lg-6 mb-3 signup_form">
              {/* applying translation using t variable to signupTitle*/}
              <h2 className="title mb-5"> {t("signUpTitle")} </h2>
              {/* created form  */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3 mt-3 form-group">
                  <label htmlFor="name">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="material-icon-name"
                    />
                  </label>

                  {/* use aria-invalid to indicate field contain error */}
                  {/* The aria-invalid state indicates the entered value does not conform to the 
                      format expected by the application. */}
                  <input
                    id="name"
                    type="text"
                    className="form-control"
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register("name", { required: true, maxLength: 30 })}
                    /* applying translation using t variable to yourName*/
                    placeholder={t("your Name")}
                    value={inputValues.name}
                    onChange={handleOnChange}
                  ></input>
                  {errors.name && errors.name.type === "required" && (
                    <span id="name_error" role="alert">
                      This is required
                    </span>
                  )}
                  {errors.name && errors.name.type === "maxLength" && (
                    <span role="alert">Max length exceeded</span>
                  )}
                </div>
                <div className="mb-3 mt-3 form-group">
                  <label htmlFor="email" className="form-label">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="material-icon-name"
                    />
                  </label>
                  {/* input tag for email */}
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    {...register("email", {
                      required: "required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format",
                      },
                    })}
                    value={inputValues.email}
                    onChange={handleOnChange}
                    /* applying translation using t variable to your Email*/
                    placeholder={t("your Email")}
                  />

                  {errors.email && (
                    <span id="email_error" role="alert">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="mb-3 mt-3 form-group">
                  <label htmlFor="password" className="form-label">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="material-icon-name-1"
                    />
                  </label>
                  {/* Tooltip */}
                  <Tooltip
                    content={
                      <div className="outer-box">
                        <div>
                          <p>
                            The minimum password length is 8 characters and must
                            contain at least 1 lowercase letter, 1 capital
                            letter, 1 number and 1 special character
                          </p>
                        </div>
                        <div className="icon">
                          {validationRules.validLength ? checkIcon : crossIcon}

                          <p className="para"> # of characters</p>
                        </div>
                        <div className="icon">
                          {validationRules.containsLowercase
                            ? checkIcon
                            : crossIcon}

                          <p className="para"> Lowercase Letter</p>
                        </div>
                        <div className="icon">
                          {validationRules.containsUppercase
                            ? checkIcon
                            : crossIcon}

                          <p className="para"> Capital Letter</p>
                        </div>
                        <div className="icon">
                          {validationRules.containsNumber
                            ? checkIcon
                            : crossIcon}

                          <p className="para"> Number</p>
                        </div>
                        <div className="icon">
                          {validationRules.containsSymbol
                            ? checkIcon
                            : crossIcon}

                          <p className="para"> Special Character</p>
                        </div>
                      </div>
                    }
                    direction="bottom"
                  >
                    {show ? (
                      <FontAwesomeIcon
                        icon={faEye}
                        id="show_hide"
                        onClick={handleShowHide}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        id="show_hide"
                        onClick={handleShowHide}
                      />
                    )}
                  </Tooltip>
                  <input
                    id="password"
                    type={show ? "text" : "password"}
                    className="form-control"
                    {...register("password", {
                      required: "required",
                      minLength: {
                        value: 5,
                        message: "min length is 5",
                      },
                    })}
                    /* applying translation using t variable to Password*/
                    placeholder={t("Password")}
                    value={password}
                    onChange={handlePassword}
                  />
                  {errors.password && (
                    <span role="alert">{errors.password.message}</span>
                  )}
                </div>
                <div className="mb-3 mt-3 form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="material-icon-name"
                    />
                  </label>
                  <input
                    id="confirm_password"
                    type={show1 ? "text" : "password"}
                    className="form-control"
                    {...register("confirmPassword", {
                      required: "required",
                      minLength: {
                        value: 5,
                        message: "min length is 5",
                      },
                    })}
                    /* applying translation using t variable to Repeat Your Password*/
                    placeholder={t("Repeat Your Password")}
                    value={inputValues.confirmPassword}
                    onChange={handleOnChange}
                  />
                  {errors.password && (
                    <span role="alert">{errors.password.message}</span>
                  )}
                </div>
                <div className="form-group mt-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    {...register("checked", {
                      required: true,
                    })}
                  />
                  <span className="text">
                    {/* applying translation using t variable to I agree all statements in Terms of service*/}
                    {t("I agree all statements in Terms of service")}
                  </span>
                </div>
                <div>
                  {/* button tag */}
                  <button
                    type="submit"
                    onSubmit={handleSubmit}
                    className=" mb-1 register"
                  >
                    {/* applying translation using t variable to Register*/}
                    {t("Register")}
                  </button>
                </div>
              </form>
            </div>
            <div className=" col-md-6 col-sm-12 col-12 col-lg-6 image">
              <img
                className="img mw-100 me-5"
                src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg"
                alt="signup_image"
              />
              {/* link to login form */}
              <Link to="/login" className="signup-image-link">
                {/* applying translation using t variable to I am already member*/}
                {t("I am already member")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default SignupForm;
