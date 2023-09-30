import React from 'react';
import './MyProfile.css';
import Sidebar from '../Sidebar/Sidebar';

function Card({label , value }) {
   
  return (
    <div className="myProfileCard">
      <h2>{label} :<b>{value}</b></h2>
      
    </div>
  );
}

function MyProfile() {
  const cardData = [
    {
      label:'Total Energy Produced perKWH' ,
      value:50,
    },
    {
    
      label:'Total Energy Consumed perKWH' ,
      value:50,
     
    },
    {
      
      label:'Total Energy Sold' ,
      value:50,
    },
    {
      label:'Total Energy Bought' ,
      value:50,
    },
    {
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
          <Card key={index} label={data.label} value={data.value} />
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
