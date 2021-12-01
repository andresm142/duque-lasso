// import logo from './logo.svg';
// import './App.css';
import './bootstrap.css';
import React from 'react';
import Login from './pages/Login';

import Sidebars from './Sidebars';

import { useState } from "react";

function App() {
  
  const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged"));

  const iniciarSeccion = function (e) {
    if(e===true){
    setIsLogged(true);
    localStorage.setItem("isLogged", true);
    }
  }

  const cerrarSeccion = function (e) {
    if(e===true){
    setIsLogged(false);
    localStorage.setItem("isLogged", false);
    }
  }

  if (isLogged) {
    return (
      <div >
        <Sidebars cerrarSeccion={ cerrarSeccion }/>
      </div>
    );
  } else {
    return (
      <div>

        <Login iniciarSeccion={iniciarSeccion} />

      </div>);
  }
}


export default App;
