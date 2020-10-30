import React, { useState, useContext } from "react";
import "./Sign.css";
import { UserContext } from "../../Contexts";
import { signIn } from "../../services/user";
import { FormEvent } from "../../types";

const SignIn = () => {
  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const user = await signIn({ username, password });
      if (setUser) {
        setUser(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="sign-form" onSubmit={handleSubmit}>
        <label>Sign In:</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignIn;
