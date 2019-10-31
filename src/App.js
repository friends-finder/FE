import React from "react";
import "./App.css";
import LoginStuff from "./Components/login";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LoginStuff} />
      <a href="https://friendsfinder.netlify.com/">
        <button to="">Logout</button>
      </a>
      <br />
      <br />
      Copyright © 2019
      <br /> <br />
      <br />
      <a href="https://friendfinderui.netlify.com/" target="_blank">
        Return Home
      </a>
      <br /> <br /> <br />
    </div>
  );
}

export default App;
