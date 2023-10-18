import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { isUserLoggedIn } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Navbar(){
  const currentUser = isUserLoggedIn();
  const navigate = useNavigate();
  const expireSession = () => {
    localStorage.clear()
    navigate('/')
  }

  return(
    <ul className="nav-style">
      <li className="nav-link-item">
        <Link to="/">Home</Link>
      </li>
      { currentUser ? (
          <li className="nav-link-item">
            <Link to="/signout" onClick={expireSession}>Logout</Link>
          </li>
        ) : (
          <li className="nav-link-item">
            <Link to="/signup">Signup</Link>
          </li>
      )}
      { currentUser ? null : (
        <li className="nav-link-item">
          <Link to="/signin">SignIn</Link>
        </li>
      )}
  </ul>
  )
}
