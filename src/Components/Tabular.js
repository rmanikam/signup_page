import React, { useState } from "react";

import Axios from "axios";

const Tabular = (props) => {
  const [updatedValues, setUpdatedValues] = useState({
    id: "",
    name: "",
    location: "",
    animal: "",
    no: "",
  });
  async function handleEdit(event) {
    event.preventDefault();
    let response = () => {
      Axios.put("http://localhost:8081/nodeApi/zoo/update", {
        id: updatedValues.id,
        name: updatedValues.name,
        location: updatedValues.location,
        animal: updatedValues.animal,
        no: updatedValues.no,
      }).then((res) => {
        console.log(res);

        setUpdatedValues(res.id);
      });
    };
    await response();
    //console.log(responseData);
  }
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Location</th>
            <th scope="col">Animal</th>
            <th scope="col">No</th>
            <th scope="col" onclick={handleEdit}>
              Edit Button
            </th>
            <th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((d, index) => (
            <tr key={d.id}>
              <td>{index + 1}</td>
              <td>{d.name}</td>
              <td>{d.location}</td>
              <td>{d.animal}</td>
              <td>{d.no}</td>
              <td>
                <button> Edit</button>
              </td>
              <td>
                <button>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
// note if i use default in export then in next page where values are being imported i dont use
// curly braces when importing values in the next page. but if i use export const Tabular then i
// use curly braces when i import data in the next page
export default Tabular;
