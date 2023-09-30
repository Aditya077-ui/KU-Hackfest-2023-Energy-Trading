import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Sidebar.css";

export default function Sidebar() {
    const navigate = useNavigate();


  return (
    <div className="sidebar">
        <div className="logoContainer">
          <img src={require("./Asset.png")} className='dashboardLogo' alt="Logo"></img>
        </div>
        <ul>
          <li onClick={() => {navigate("/myprofile")}}>MyProfile</li>
          <li onClick={() => {navigate("/myhome")}}>MyHome</li>
          <li onClick={() => {navigate("/marketplace")}}>Marketplace</li>
        </ul>
      </div>
  )
}
