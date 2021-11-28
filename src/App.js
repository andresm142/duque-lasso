// import logo from './logo.svg';
// import './App.css';
import './bootstrap.css';
import React from 'react';
import Login from './components/Login';
import Cultivos from './components/Cultivos';
import Predios from './components/Predios';
import Profile from './components/Profile';
import Users from './components/Users';
import Home from './components/Home';
import AccessDenied from './components/AccessDenied';
import PageNotFound from './components/PageNotFound'
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
