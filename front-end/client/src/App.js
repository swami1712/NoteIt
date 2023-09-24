import React, { useState } from "react";
import Signup from "./components/Signup";
import "./App.css";
import Navbar from "./components/Navbar";
import NavbarChild from "./components/NavbarChild";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import Addnotes from "./components/Addnotes";
import Displaynotes from "./components/Displaynotes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Alert from "./components/Alert";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { base_url } from "./services/helper";

const App = () => {
  const [alert, setAlert] = useState(null);
  const [userData, setUserdata] = useState([]);
  let token = localStorage.getItem("token"),
    user;
  const getUserDetails = async () => {
    if (token) {
      user = jwtDecode(token);
      try {
        await axios
          .post(`${base_url}/fetchStudent`, { user: user.id })
          .then((res) => {
            const { data } = res.data;
            setUserdata(data);
          });
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    }
  };

  const showAlert = (type, message) => {
    setAlert({
      type: type,
      message: message,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar title="NoteIt" />
        <NavbarChild userData={userData} getUserDetails={getUserDetails} />
        <Alert alert={alert} />
        <Routes>
          <Route
            path="/"
            element={
              <Home userData={userData} getUserDetails={getUserDetails} />
            }
          />
          <Route path="signup" element={<Signup showAlert={showAlert} />} />
          <Route path="login" element={<Login showAlert={showAlert} />} />
          <Route path="logout" element={<Logout showAlert={showAlert} />} />
          <Route
            path="profile"
            element={
              <Profile userData={userData} getUserDetails={getUserDetails} />
            }
          />
          <Route
            path="addnotes"
            element={
              <Addnotes
                userData={userData}
                getUserDetails={getUserDetails}
                showAlert={showAlert}
              />
            }
          />
          <Route
            path="mynotes"
            element={
              <Displaynotes
                userData={userData}
                getUserDetails={getUserDetails}
                showAlert={showAlert}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
