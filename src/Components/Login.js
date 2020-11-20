import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import cosmos_logo from "../Images/cosmos_logo.png";
import { useStateValue } from "./StateProvider.js";
import "./Login.css";

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user_type, setUserType] = useState("");
  const [status, setStatus] = useState("");
  const [{ basket, user }, dispatch] = useStateValue();

  const login = (event) => {
    event.preventDefault();

    const loginAPI = "/api/login/username=" + username + "&pwd=" + password + "&user_type=" + user_type;
    fetch(loginAPI)
      .then((response) => response.json())
      .then(
        (data) => {
          setStatus(data)
          console.log("loggged in", data);
          history.push('/');


        }

      );

  };

  const register = (event) => {
    event.preventDefault(); //prevents refresh after submitting form

    const signupAPI = "/api/signup/username=" + username + "&pwd=" + password + "&user_type=" + user_type;


    fetch(signupAPI)
      .then((response) => response.json())
      .then((data) => setStatus(data));
    history.push('/');
  };
  return (
    <div className="login">
      <Link to="/">
        <img className="login__logo"
          src={cosmos_logo}
          alt="" />
      </Link>

      <div className="login__container">
        <h2>Welcome to the Login Page</h2>
        <form>
          <div className="login__user_type">
            <input type="checkbox" id="admin" name="admin" value="admin" onChange={(event) => setUserType(event.target.value)} />
            <label htmlFor="admin">admin</label>
            <input type="checkbox" id="customer" name="customer" value="customer" onChange={(event) => setUserType(event.target.value)} />
            <label htmlFor="customer">customer</label>
          </div>
          <h5>Username</h5>
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            type="text"
          ></input>
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="text"
          ></input>
          <button onClick={login} type="submit">
            Sign In
          </button>

        </form>
        <Link to="/signup">
          <button>Create an Account</button>
        </Link>
        <h1>Logged In status: {status.login_status}</h1>
      </div>

    </div>
  );
}

export default Login;
