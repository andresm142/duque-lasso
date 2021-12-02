// import logo from './logo.svg';
// import './App.css';
import './bootstrap.css';
import React from 'react';
import Login from './pages/Login';

import Sidebars from './Sidebars';

import { useState } from "react";

function App() {

  // const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged"));
 
  const iniciarSesion = function (e) {
    if (e === true) {
      // setIsLogged(true);
      sessionStorage.setItem("isLogged", true);
      // localStorage.setItem("isLogged", "true");
      window.location.href = "/";
      
    }
  }

  const cerrarSesion = function (e) {
    if (e === true) {
      sessionStorage.setItem("isLogged", "false");
      // localStorage.setItem("isLogged", "false");
      window.location.href = "/";
      // setIsLogged(false);
      
    }
  }

  // if (localStorage.getItem("isLogged")==="true") {
  if (sessionStorage.getItem("isLogged")==="true") {
    return (
      <div >
        
        <Sidebars cerrarSesion={cerrarSesion} />
      </div>
    );
  } else {
    
      return (
        <div>
          
          <Login iniciarSesion={iniciarSesion} />

        </div>);
    
  }
}


export default App;
