import React from 'react';
import './App.css';
import LoginStuff from './Components/login';
import { Route } from 'react-router-dom';




function App() {
  return (
    <div className="App">
     

  




  <Route exact path="/" component={LoginStuff} />
  
    <button to="/">Logout</button>


    <br />  <br />


    </div>
  );
}



export default App;
