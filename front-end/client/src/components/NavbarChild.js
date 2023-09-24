import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavbarChild = (props) => {
  // const token = localStorage.getIstem('token')
  const Navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    Navigate("/login");
  };
  useEffect(() => {
    props.getUserDetails();
  }, []);

  return (
    <>
      {/* <div className='Navbar-child'> */}
      <ul className="Navbar-child navbar-nav">
        <li>
          {" "}
          <Link to="">Home</Link>
        </li>

        {localStorage.getItem("token") && (
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to="/profile"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {props.userData.email}
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/addnotes">
                  AddNotes
                </Link>
              </li>
            </ul>
          </li>
        )}
        {!localStorage.getItem("token") ? (
          <>
            <li>
              {" "}
              <Link to="/login">SignIn</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/logout">SignOut</Link>
          </li>
        )}
      </ul>
    </>
  );
};

export default NavbarChild;
