import React, { useState, useContext } from "react";
import "./Navbar.css";
import logo from "../../images/bug.png";
import SignUp from "../Sign/SignUp";
import SignIn from "../Sign/SignIn";
import { UserContext } from "../../contexts/UserContext";
import { ProjectsContext } from "../../contexts/ProjectsContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const { setProjects } = useContext(ProjectsContext);

  const [sign, setSign] = useState("in");

  const toggleSign = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newSign = sign === "up" ? "in" : "up";
    setSign(newSign);
  };

  const handleSignOut = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (setUser && setProjects) {
      setUser(null);
      setProjects([]);
    }
  };

  return (
    <nav>
      <div className="heading">
        <img src={logo} alt="bug logo" />
        <h1>Bug-tracker</h1>
      </div>
      <div className="auth">
        {(user && (
          <div className="sign-form">
            <p>Welcome, {user.username}</p>
          </div>
        )) ||
          (sign === "in" && <SignIn />) || <SignUp />}
        {(user && (
          <span className="nav-action-span">
            <button onClick={handleSignOut}>Sign Out</button>
          </span>
        )) || (
          <span className="nav-action-span">
            <p>Or:</p>
            <button onClick={toggleSign}>{sign === "up" ? "Sign In" : "Sign Up"}</button>
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
