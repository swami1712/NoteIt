import React, { useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { base_url } from "../services/helper";

const Addnotes = (props) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    let userId = jwtDecode(token);
    userId = userId.id;
    await axios
      .post(`${base_url}/addnote`, {
        title,
        desc,
        userId,
      })
      .then((res) => {
        props.showAlert("success", `${res.data.message}`);
        setTitle("");
        setDesc("");
      })
      .catch((err) => {
        console.log("could not add notes" + err);
      });
  };

  return (
    <>
      {localStorage.getItem("token") ? (
        <div className="container">
          <div className="form-box">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Add Title
              </label>
              <input
                required
                type="name"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="my note"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Description
              </label>
              <textarea
                required
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>
            <div className="btn btn-primary" onClick={handleSubmit}>
              Add note
            </div>
          </div>
        </div>
      ) : (
        <h1>401 you are not authenticated</h1>
      )}
    </>
  );
};

export default Addnotes;
