import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSolid, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import Tabular from "./Tabular";
import "./Zoo.css";

const Zoo = () => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/nodeApi/zoo/list").then((response) => {
      setData({ ...response.data });
    });
  });

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.clear(); //for localStorage
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <div>
            <img
              id="zoo_img"
              src="https://cdn-icons-png.flaticon.com/512/2093/2093797.png"
              alt="logo"
            ></img>
          </div>
          <div className="search-container">
            <form class="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="magnifying-glass"
              />
            </form>
          </div>
          <div className=" mt-5 ms-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="user-dp"
              width="40"
              height="30"
              className="d-inline-block me-3"
            ></img>
            <span className="d-inline-block me-3"> Raman Sahi</span>
            <span onClick={handleLogout}>Log out</span>
          </div>
        </div>
      </nav>

      <div className="container_body text-center">
        <div className="d-block">
          <img
            src="https://media.gettyimages.com/photos/lion-and-lioness-on-wooden-platform-in-zoo-picture-id597703431?s=2048x2048"
            alt="zoo_image"
            width="400"
            height="200"
            className="mt-3"
          ></img>
        </div>
      </div>
      <Tabular data={data} />
    </>

   
  );
};
export default Zoo;
