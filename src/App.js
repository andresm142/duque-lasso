// import logo from './logo.svg';
// import './App.css';
import './bootstrap.css';
import React from 'react';
import Login from './pages/Login';

import Sidebars from './Sidebars';

import { useState } from "react";

function App() {
  
  const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged"));

  const iniciarSesion = function (e) {
    if(e===true){
    setIsLogged(true);
    localStorage.setItem("isLogged", true);
    }
  }

  const cerrarSesion = function (e) {
    if(e===true){
    
    setIsLogged(false);
    localStorage.setItem("isLogged", false);
    
    
    }
  }

  if (isLogged) {
    return (
      <div >
        <Sidebars cerrarSesion={ cerrarSesion }/>
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
