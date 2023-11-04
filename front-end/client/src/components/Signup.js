import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import { base_url } from "../services/helper";

const Signup = (props) => {
  // const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setUsername] = useState("");
  const [password, setPw] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState();

  const Navigate = useNavigate();
  // useEffect(() => {
  //     fetchStudents();
  // }, []);
  // const fetchStudents = async () => {
  //     try {
  //         // This is the function for fetching all the users details
  //         const { data } = await axios.get('http://localhost:5000/register');
  //         setStudents(data.data);
  //         console.log(data)
  //     } catch (error) {
  //         console.error('Failed to fetch students:', error);
  //     }
  // };

  const validate = (value) => {
    if (value !== "") {
      if (
        validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        setErrorMessage("Strong password");
      } else {
        setErrorMessage("Not a strong password");
      }
    } else {
      setErrorMessage("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${base_url}/register`, {
        name,
        email,
        password,
      });
      setName("");
      setUsername("");
      setPw("");
      // console.log(data)
      const { success, message } = data;
      if (success) {
        props.showAlert("success", `${message}`);
        Navigate("/login");
      } else {
        props.showAlert("danger", `${message}`);
      } // Refresh the list of students after successful registration
    } catch (error) {
      console.error("Failed to register student:", error);
    }
    setLoading(false);
  };
  return (
    <div className="form">
      <div className="form-box">
        <form onSubmit={handleSubmit} className="needs-validation" novalidate>
          {/* <label for="loginSelect">Register as:</label>
                    <select className="form-select" id="loginSelect" name="cars">
                        <option value="Student">Student</option>
                        <option value="Admin">Admin</option>
                    </select> */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              UserName
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label" required>
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="PW"
              value={password}
              onChange={(e) => {
                setPw(e.target.value);
                validate(e.target.value);
              }}
              className={`form-control ${
                errorMessage !== ""
                  ? errorMessage === "Strong password"
                    ? "is-valid"
                    : "is-invalid"
                  : null
              } `}
            />
            <div
              className={`${
                errorMessage === "Strong password"
                  ? "valid-feedback"
                  : "invalid-feedback"
              }`}
            >
              {errorMessage}
            </div>
          </div>

          <button
            disabled={errorMessage === "Strong password" ? false : true}
            className="btn btn-primary"
            type="submit"
          >
            {loading ? "Registering..." : "SignUp"}
          </button>
          <p className="my-2">
            Already have an account?{" "}
            <i>
              <Link id="signUp-link" to="/login">
                SignIn
              </Link>
            </i>
          </p>
        </form>
      </div>

      {/* <h2>Registered Students:</h2> */}
      {/* <ul>
                <div className="row">
                    {students.map((student) => (

                        <div className="col-lg-3" key={student._id}>
                            <div className="card mb-2" >
                                <div className="card-body">
                                    {student.name} - {student.email} - {student.course}
                                </div>
                            </div>
                        </div>


                        // <li key={student._id}>
                        //     {student.name} - {student.email} - {student.course}
                        // </li>
                    ))
                    }
                </div>
            </ul > */}
    </div>
  );
};

export default Signup;
