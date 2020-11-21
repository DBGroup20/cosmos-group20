import React, { useState, useEffect } from "react";

import logo from "./logo.svg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login.js";
import Signup from "./Components/Signup.js";
import Header from "./Components/Header.js";
import Home from "./Components/Home.js";
import Checkout from "./Components/Checkout.js";
import { useStateValue } from "./Components/StateProvider.js";

const backendAddr = "https://cosmos-app-group20.herokuapp.com";
function App() {
  const [{ basket }, dispatch] = useStateValue();
  useEffect(() => {


  }, [])
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/checkout">
            <Header></Header>
            <Checkout></Checkout>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/signup">
            <Signup></Signup>
          </Route>
          <Route path="/">
            <Header></Header>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
