// @ts-ignore
import React, { useState, useEffect } from "react";
// import useForm from "../useForm";
// @ts-ignore
import { useForm } from "react-hook-form";
//import validate from "../validation1";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useTranslation } from "react-i18next";
//import { Navigate } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
//import useForm from "../useForm";
//imported icons from Font Awesome

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { faGooglePlusSquare } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

library.add(faFacebookSquare, faTwitterSquare, faGooglePlusSquare);

// Loginform function
const LoginForm = () => {
  // Initialized value to variables name and password

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
  // initialized value of false from useState to show variable and setShow function of type const

  const [show, setShow] = useState(false);

  // initialized value of empty object from useState to errors variable and setErrors function of type const

  //  const [errors, setErrors] = useState({});

  // initialized value of 0 from useState to count variable and setCount function of type let

  //   let [count, setCount] = useState(0);

  // initialized value of empty array from useState to storevariable and setStore function of type const
  //   const [store, setStore] = useState([]);

  // used destructuring to insert value from useTranslation to variable t and i18n of type const
  const { t, i18n } = useTranslation();

  // initialized value of empty array from useState to userLoginDetail variable and setUserLoginDetail function of type const
  const [userLoginDetail, setUserLoginDetail] = useState([]);

  // const onSubmit = async (data) => {
  //   await login(data.email, data.password);
  //   reset();
  // };

  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  //handleSubmit function
  function onSubmit(data, event) {
    event.preventDefault();
    console.log(data);

    // calling the API by axios.

    let response = () => {
      console.log("Login Form");
      //return new Promise(function (resolve, reject) {
      Axios.post("http://localhost:8081/nodeApi/user/login", {
        email: inputValues.email,
        password: inputValues.password,
      }).then((res) => {
        console.log(res);

        const loggedInUser = { ...res.data.user, isLoggedIn: true };
        console.log(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));

        setUserLoginDetail({ ...res.data });

        //isLoggedIn ? <navigate to="/emptyzoo" /> : <LoginForm />;
        console.log(typeof loggedInUser.isLoggedIn);
        if (loggedInUser.isLoggedIn) {
          return navigate("/dashboard");
        } else {
          return navigate("/");
        }
        // console.log(userLoginDetail);
        // if (res === "") {
        //   navigate(EmptyZoo);
        // } else {
        //   navigate(Zoo);
        // }
      });
      // }).catch((error) => {
      //console.log(error);

      // };aaz
    };
    response();

    //     const receivedError = validate(fields);
    //     setErrors(receivedError);
  }

  return (
    //created section tag
    <section>
      <div className="main d-flex justify-content-center align-items-center py-5 my-5">
        <div className="container d-flex justify-content-center align-items-center rounded my-2 ">
          <div className="row my-2 border row_padding">
            <div className=" col-md-6 col-sm-12 col-12 col-lg-6 image">
              {/* image tag */}
              <img
                className="img mw-100 me-5"
                src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signin-image.jpg"
                alt="signup_image"
              />
              {/* link from loginForm to SignupForm */}
              <Link to="/" className="signup-image-link-1">
                {/* applying translation using t variable to Create an account*/}
                {t("Create an account")}
              </Link>
            </div>
            <div className="col-md-6 col-sm-12 col-12 col-lg-6  mb-3 signup_form">
              {/* applying translation using t variable to signInTitle*/}
              <h2 className="title"> {t("signInTitle")}</h2>
              {/* created form  */}

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3 mt-3 form-group">
                  <label htmlFor="email" className="form-label">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="material-icon-name"
                    />
                  </label>
                  {/* input tag for email */}
                  <input
                    id="email_user"
                    type="email"
                    className="form-control"
                    {...register("email", {
                      required: "required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format",
                      },
                    })}
                    /* applying translation using t variable to your Email*/
                    placeholder={t("your Email")}
                    value={inputValues.email}
                    onChange={handleOnChange}
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
                      className="material-icon-name"
                    />
                  </label>
                  {/* input tag for password */}
                  <input
                    id="password_user"
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
                    value={inputValues.password}
                    onChange={handleOnChange}
                  />
                  {errors.password && (
                    <span role="alert">{errors.password.message}</span>
                  )}
                </div>
                <div className="form-group-1">
                  {/* input tag for checkbox */}
                  <input
                    type="checkbox"
                    className="form-check-input"
                    {...register("checked", {
                      required: true,
                    })}
                  />

                  <span className="text-1">{t("Remember me")}</span>
                </div>
                <div>
                  {/* button */}
                  <button type="submit" className=" mb-1 register">
                    {t("Log in")}
                  </button>
                </div>
              </form>
              {/* social-icons */}
              <div className="social-login">
                <span className="social-label">{t("Or login with")}</span>
                <ul className="social-icons">
                  <li>
                    <a href="#">
                      <FontAwesomeIcon
                        // @ts-ignore
                        icon="fa-brands fa-facebook-square"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FontAwesomeIcon
                        // @ts-ignore
                        icon="fa-brands fa-twitter-square"
                      />
                    </a>
                  </li>
                  <li>
                    <a>
                      <FontAwesomeIcon
                        // @ts-ignore
                        icon="fa-brands fa-google-plus-square"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LoginForm;
