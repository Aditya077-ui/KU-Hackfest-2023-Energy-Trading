
import './MyProfile.css';
import Sidebar from '../Sidebar/Sidebar';
import { FaBatteryFull, FaBolt, FaMoneyBill, FaThermometer, FaTint } from 'react-icons/fa';
import {useLocation} from 'react-router-dom';
import React, { useState } from 'react';
import axios  from 'axios';
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

function MyProfile(prop) {

  const [textBoxValue, setTextBoxValue] = useState('');

  const location = useLocation();
  // const navigate = useNavigate();

  const handleTextBoxChange = (event) => {
    setTextBoxValue(event.target.value);
  };

  const handleSubmit = async () => {
    // try {
    //   console.log(location.state.pvtAddress)
    //   console.log(textBoxValue)
    //   console.log(location.state.user.houseNo)
      


    //   const response = await axios.post('http://localhost:5000/api/sales/listing/add', {
    //       "pvtAddress" : location.state.user.pvtAddress,
    //       "amount": textBoxValue,
    //       "houseNo": location.state.user.houseNo
    //   });
    //   window.alert('Operation Successful!');
    // } catch (error) {
    //   console.log(error);
    // }
 
      try {
        
        const response = await axios.get('http://localhost:5000/api/sales/listing/fetch')
        console.log(response.data)
  
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    
  };

  const cardData = [
    {
      icon: <FaBolt color='orange'/>,
      label:'Total Energy Produced perKWH' ,
      value:50,
    },
    {
      icon:<FaTint color='Red'/>,
      label:'Total Energy Consumed perKWH' ,
      value:50,
     
    },
    {
      icon:<FaMoneyBill color='green'/>,
      label:'Total Energy Sold' ,
      value:50,
    },
    {
      icon:<FaThermometer color='blue'/>,
      label:'Total Energy Bought' ,
      value:50,
    },
    {
      icon:<FaBatteryFull color=''/>,
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
         <input
        type="text"
        value={textBoxValue}
        onChange={handleTextBoxChange}
        placeholder="Type something..."
      />
         <div className="myProfileButtonContainer">
          <button type="button" className="myProfileButton" onClick={handleSubmit}>
           Sell Energy
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
