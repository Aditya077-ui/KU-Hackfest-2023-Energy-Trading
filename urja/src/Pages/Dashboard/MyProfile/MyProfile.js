import React from 'react';
import './MyProfile.css';
import Sidebar from '../Sidebar/Sidebar';
import { FaBatteryFull, FaBolt, FaMoneyBill, FaThermometer, FaTint } from 'react-icons/fa';



function Card({icon,label , value }) {
   
  return (
    <div className="myProfileCard">
     <div className="card-icon">
        {icon}
      </div>
      <div className="card-content">
        <div className="card-label">{label}:</div>
        <div className="card-value"><b>{value}</b></div>
      </div>
      
    </div>
  );
}

function MyProfile() {
  const cardData = [
    {
      icon: <FaBolt/>,
      label:'Total Energy Produced perKWH' ,
      value:50,
    },
    {
      icon:<FaTint/>,
      label:'Total Energy Consumed perKWH' ,
      value:50,
     
    },
    {
      icon:<FaMoneyBill/>,
      label:'Total Energy Sold' ,
      value:50,
    },
    {
      icon:<FaThermometer/>,
      label:'Total Energy Bought' ,
      value:50,
    },
    {
      icon:<FaBatteryFull/>,
      label:'Battery health' ,
      value:50,
    },
    
   
    ];

  return (
    <div className="myProfile">
      <Sidebar/>
      <div className="main-content">
       
       <h1 className='myProfileTitle'>My Profile</h1>
       <div className='card-container'>
        {cardData.map((data, index) => (
          <Card key={index} icon={data.icon} label={data.label} value={data.value} />
        ))}
       </div>
         {/* Add the button below all the cards */}
         <div className="myProfileButtonContainer">
          <button type="button" className="myProfileButton">
           Sell Energy
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
