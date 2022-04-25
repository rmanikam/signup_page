import React, { useState } from "react";
import "./Zoo.css";
import { Button, Modal } from "react-bootstrap";

import Axios from "axios";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

const locations = [
  {
    id: 1,

    country: "USA",
    state: [
      {
        id: 1,
        name: "Philadelphia",
      },
      {
        id: 2,
        name: "New York",
      },
    ],
  },
  {
    id: 2,

    state: [
      {
        id: 1,
        name: "New Delhi",
      },
      {
        id: 2,
        name: "Maharashtra",
      },
    ],
    country: "India",
  },
  {
    id: 3,

    state: [
      {
        id: 1,
        name: "Austria",
      },
      {
        id: 2,
        name: "Netherlands",
      },
    ],
    country: "Europe",
  },
  {
    id: 4,

    state: [
      {
        id: 1,
        name: "Gauteng",
      },
      {
        id: 2,
        name: "Tanzenia",
      },
    ],
    country: "Africa",
  },
  {
    id: 5,

    state: [
      {
        id: 1,
        name: "Selangor",
      },
      {
        id: 2,
        name: "Kedah",
      },
    ],
    country: "Malaysia",
  },
];
const EmptyZoo = () => {
  const [show, setShow] = useState(false);
  const { t, i18n } = useTranslation();
  const [inputValues, setInputValues] = useState({
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
  });
  const [states, setStates] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleCountryChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    const location = locations.find((l) => l.country === value);
    console.log(location);
    setStates(location.state);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.clear(); //for localStorage
    navigate("/");
  };
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    console.log("datavalues", inputValues);
    let response = () => {
      Axios.post("http://localhost:8081/nodeApi/zoo/save", {
        name: inputValues.name,
        address1: inputValues.address1,
        address2: inputValues.address2,
        country: inputValues.country,
        state: inputValues.state,
        city: inputValues.city,
      }).then((res) => {
        console.log(res);

        const ZooData = { ...res.data };
        console.log(ZooData);
        if (ZooData) {
          return navigate("/Zoo");
        } else {
          console.log("data is not being send to the server");
        }
      });
    };
    await response();
  }
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
            width="600"
            height="400"
            className="mt-3"
          />
        </div>

        <div className="d-inline-block mt-3">
          <Button onClick={handleShow}>Add Zoo</Button>
        </div>
        <Modal show={show} onHide={handleClose} size="md-down">
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label id="user_name">
                  Name:
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    required
                    placeholder={t("Name")}
                    value={inputValues.name}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="mb-3 mt-3 form-group">
                <label className="form-label user_address_1">
                  Address1:
                  <input
                    type="text"
                    name="address1"
                    placeholder={t("Street")}
                    className="form-control"
                    required
                    value={inputValues.address1}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="mb-3 mt-3 form-group">
                <label className="form-label user_address_2">
                  Address2:
                  <input
                    type="text"
                    name="address2"
                    placeholder={t("Street")}
                    className="form-control "
                    required
                    value={inputValues.address2}
                    onChange={handleChange}
                    // id="street_address_1"
                  />
                </label>
              </div>
              <div className="mb-3 mt-3 form-group">
                <label className="form-label" id="user_country" type="text">
                  Country:
                  <select
                    name="country"
                    onChange={handleCountryChange}
                    id="country"
                    required
                  >
                    <option>Select: Country</option>
                    {locations.map((location) => (
                      <option>{location.country}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="mb-3 mt-3 form-group">
                <label className="form-label" id="user_state" type="text">
                  State:
                  <select
                    name="state"
                    id="inputState"
                    required
                    onChange={handleChange}
                  >
                    <option>Select: State</option>
                    {states.map((s) => (
                      <option>{s.name}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="mb-3 mt-3 form-group">
                <label className="form-label" id="user_city">
                  City:
                  <input
                    type="text"
                    name="city"
                    placeholder={t("City")}
                    className="form-control"
                    required
                    //id="inputCity"
                    value={inputValues.city}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <Button
                type="button"
                className="btn btn-primary"
                id="btn_close"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                type="submit"
                className="btn btn-secondary"
                id="btn_submit"
              >
                Submit
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default EmptyZoo;
