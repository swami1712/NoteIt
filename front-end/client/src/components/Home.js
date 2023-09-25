import React, { useEffect } from "react";
import Displaynotes from "./Displaynotes";
import { Link } from "react-router-dom";

const Home = (props) => {
  useEffect(() => {
    props.getUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {localStorage.getItem("token") ? (
        <div className="container">
          <h1>Hello {props.userData.name}!</h1>
          <p className="home-p" text-align="center">
            below you can find your notes
          </p>
          <hr />
          <Displaynotes />
        </div>
      ) : (
        <div className="container">
          <h1>NoteIt - Just Note it!</h1>
          <p className="home-p">
            its a personalized notes app, to use it u need to first{" "}
            <Link id="signUp-link" to="/signup">
              Register
            </Link>{" "}
            yourself and then u can{" "}
            <Link id="signUp-link" to="/login">
              SignIn
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Home;
