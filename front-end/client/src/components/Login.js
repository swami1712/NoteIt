import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { base_url } from "../services/helper";

function Login(props) {
  const [email, setUsername] = useState("");
  const [password, setPw] = useState("");
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${base_url}/login`, {
        email,
        password,
      });
      const { token } = data;

      const { success, message } = data;
      // console.log(success);
      if (success) {
        props.showAlert("success", `${message}`);
        localStorage.setItem("token", token, { expires: 1 });
        navigate("/");
      } else {
        props.showAlert("danger", `${message}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="form-box">
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="PW"
              value={password}
              onChange={(e) => setPw(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Login
          </button>
          <p className="my-2">
            Don't have an account?{" "}
            <i>
              <Link id="signUp-link" to="/signup">
                SignUp
              </Link>
            </i>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
