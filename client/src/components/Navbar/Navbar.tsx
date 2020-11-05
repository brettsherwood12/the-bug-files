import React, { useState, useContext } from "react";
import "./Navbar.css";
import logo from "../../images/bug.png";
import SignUp from "../Sign/SignUp";
import SignIn from "../Sign/SignIn";
import { UserContext } from "../../Contexts";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const [signIn, setSignIn] = useState(true);

  return (
    <nav>
      <div className="heading">
        <img src={logo} alt="bug logo" />
        <h1>The-Bug-Files</h1>
      </div>
      <div className="auth">
        {(user && (
          <div className="sign-form">
            <p>Welcome, {user.username}</p>
          </div>
        )) ||
          (signIn === true && <SignIn />) || <SignUp />}
        {(user && (
          <span className="nav-action-span">
            <button onClick={() => setUser(null)}>Sign Out</button>
          </span>
        )) || (
          <span className="nav-action-span">
            <p>Or:</p>
            <button onClick={() => setSignIn(!signIn)}>{signIn === true ? "Sign Up" : "Sign In"}</button>
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
