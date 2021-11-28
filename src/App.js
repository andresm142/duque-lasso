// import logo from './logo.svg';
// import './App.css';
import './bootstrap.css';
import React from 'react';
import Login from './pages/Login';
import Cultivos from './pages/Cultivos';
import Predios from './pages/Predios';
import Profile from './pages/Profile';
import Users from './pages/Users';
import Home from './pages/Home';
import AccessDenied from './pages/AccessDenied';
import PageNotFound from './pages/PageNotFound'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    
    <Router>
      <Routes>
        
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cultivos" element={<Cultivos />} />
        <Route path="/predios" element={<Predios />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/none" element={<AccessDenied />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
