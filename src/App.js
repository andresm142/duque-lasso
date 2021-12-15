// import logo from './logo.svg';
// import './App.css';
import './bootstrap.css';
import React from 'react';
import Login from './pages/Login';

import Sidebars from './Sidebars';
import useToken from './pages/components/useToken';

// import { useState } from "react";

function App() {
  // const [user, setUser] = useState(null);
  const { token, setToken } = useToken();


  // const [isLogged, setIsLogged] = useState(sessionStorage.getItem("isLogged"));

  if (!token) {

    return <Login setToken={setToken} />
  }


  const cerrarSesion = function (e) {
    if (e === true) {
      sessionStorage.setItem("isLogged", "false");
      localStorage.clear();
      // localStorage.setItem("isLogged", "false");
      window.location.href = "/";
      // setIsLogged(false);

    }
  }

  return (
    <div >
 
      <Sidebars cerrarSesion={cerrarSesion} />
    </div>
  );



}


export default App;
