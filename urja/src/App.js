import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import Hero from './components/hero';
import Auth_func from './Pages/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/auth';
import React from 'react';
import MyProfile from './Pages/Dashboard/MyProfile/MyProfile.js';
import MarketPlace from './Pages/Dashboard/MarketPlace/MarketPlace';
import MyHome from './Pages/Dashboard/MyHome/MyHome';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route 
      path="/"
      element={
        <React.Fragment>
          <Navbar/>
          <Hero/>
        </React.Fragment>
      }
      />
      <Route 
      path="/auth"
      element={<Auth_func />}
      />
      <Route 
        path="/myprofile"
        element={<MyProfile />}
      />
      <Route 
        path="/marketplace"
        element={<MarketPlace/>}
      />
      <Route 
        path="/myhome"
        element={<MyHome/>}
      />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
