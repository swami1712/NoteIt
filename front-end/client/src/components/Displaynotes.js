import jwtDecode from "jwt-decode";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { base_url } from "../services/helper";
import Spinner from "./Spinner";

const Displaynotes = (props) => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState();
  // const [isData, setIsdata] = useState(false)

  const token = localStorage.getItem("token");
  let decoded, userId;
  if (token) {
    decoded = jwtDecode(token);
    userId = decoded.id;
  }

  const ref = useRef(null);
  const updateNote = (id) => {
    ref.current.click();
    setId(id);
  };

  const getNotes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${base_url}/getnotes/${userId}`);
      setNotes(res.data.notes);
    } catch (err) {
      console.log("could not fetch notes");
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    getNotes();
  }, [getNotes]);
  const deleteNote = async (id) => {
    // console.log(id);
    await axios
      .delete(`${base_url}/deletenote/${id}`)
      .then((res) => {
        // console.log(res.data.success)
        if (res.data.success === true) {
          // props.showAlert("success", `${res.data.message}`);
          const newNotes = notes.filter((note) => {
            return note._id !== id;
          });
          setNotes(newNotes);
        } else {
          // console.log("else part")
          // props.showAlert('danger', `${res.data.message}`)
        }
      })
      .catch((err) => {
        console.log("err could not delete note", err);
      });
  };
  const updateNotes = async (id) => {
    await axios
      .put(`${base_url}/updatenote/${id}`, {
        title,
        desc,
      })
      .then((res) => {
        // props.showAlert("success", `${res.data.message}`)
        const newNotes = notes;
        // console.log("id of note u are updating -> " + id)
        // console.log(newNotes)
        for (let i = 0; i < notes.length; i++) {
          // console.log(newNotes[i].title)
          if (newNotes[i]._id === id) {
            newNotes[i].title = title;
            newNotes[i].description = desc;
            break;
          }
        }

        setNotes(newNotes);
        setTitle("");
        setDesc("");
      })
      .catch((err) => {
        console.log("err could not update note", err);
      });
  };

  return (
    <>
      {localStorage.getItem("token") ? (
        <>
          {/* <div className='search-box justify-content-center d-flex'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input className='form-control ' type='text' placeholder='' />
                        </div> */}
          {!loading ? (
            <>
              {notes[0] ? (
                <>
                  <div className="row">
                    {notes.map((student) => (
                      <div className="col-lg-3" key={student._id}>
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">{student.title}</h5>
                            <p className="card-text">{student.description}</p>
                            <img
                              src="../icons/edit.png"
                              height="16px"
                              className="mx-2"
                              alt="edit"
                              role="button"
                              onClick={() => updateNote(student._id)}
                            />
                            <img
                              src="../icons/trash.png"
                              height="16px"
                              role="button"
                              alt="delete"
                              onClick={() => deleteNote(student._id)}
                            />
                          </div>
                          <button
                            hidden
                            type="button"
                            ref={ref}
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            Launch demo modal
                          </button>
                          <div
                            className="modal"
                            id="exampleModal"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h1
                                    className="modal-title fs-5"
                                    id="exampleModalLabel"
                                  >
                                    Do update
                                  </h1>
                                </div>
                                <div className="modal-body">
                                  <div className="mb-3">
                                    <label
                                      htmlFor="exampleFormControlInput1"
                                      className="form-label"
                                    >
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
                                </div>
                                <div className="modal-footer">
                                  {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                                  <div
                                    className="btn btn-primary"
                                    data-bs-dismiss="modal"
                                    onClick={() => updateNotes(id)}
                                  >
                                    Update Note
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <h3>
                  you don't have any notes to display but u can make notes{" "}
                  <Link id="signUp-link" to="/addnotes">
                    here
                  </Link>
                </h3>
              )}
            </>
          ) : (
            <>
              <Spinner />
            </>
          )}
        </>
      ) : (
        <h1>401 you are not authenticated</h1>
      )}
    </>
  );
};

export default Displaynotes;
