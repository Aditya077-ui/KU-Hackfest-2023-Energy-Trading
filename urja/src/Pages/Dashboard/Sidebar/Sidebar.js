import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Sidebar.css";
import axios from 'axios'
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
          <li onClick={async() => {
            
            try {
              
              const response = await axios.get('http://localhost:5000/api/sales/listing/fetch').then((data)=> {
                console.log(data)
                navigate('/marketplace',{state:{data: data.data}})
            })
              
        
        
            } catch (error) {
              console.error('Error fetching data:', error);
            }
                  
            
            // navigate("/marketplace")
            
            }}>Marketplace</li>
        </ul>
      </div>
  )
}
