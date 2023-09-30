import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './MyHome.css';
import bulbOn from './bulbOn.jpg';
import bulbOff from "./bulbOff.jpg";
import darkHouse from "./darkHouse.jpg";
import lightHouse from "./lightHouse.png";

export default function MyHome() {
  const [isBulbOn, setIsBulbOn] = useState(false);

  const toggleBulb = () => {
    setIsBulbOn(!isBulbOn);
  };

//   setInterval(() => {
//   }, interval);

//   useEffect(() => {
//   },[])

  return (
    <div>
      <div className="myHome">
        <Sidebar />
        <div className="main-content">
          <h1 className="myHomeTitle">My Home</h1>
            <div className="content">
                <div className="row1">
                <h1>Total Energy Left: 5000mWh</h1>
                <button className="toggle-button" onClick={toggleBulb}>
                    {isBulbOn ? 'Turn Off' : 'Turn On'}
                </button>
                <img
                    src={isBulbOn ? bulbOn : bulbOff}
                    alt={isBulbOn ? 'On Bulb' : 'Off Bulb'}
                    className="bulb-image"
                    />
                <div>
            </div>
        </div>
        <div className='row2'>
              <img
                src={isBulbOn ? lightHouse : darkHouse}
                alt={isBulbOn ? 'On Bulb' : 'Off Bulb'}
                className="house-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
