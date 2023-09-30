import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './MyHome.css';
import lightmode from "./lightmode.png"
import darkmode from "./Darkmode.png"
import tv_off from './tv_off.png';
import tv_on from './tv_on.png';
import fan_on from './fan_on.gif';
import fan_off from './fan_off.png';
import ref_on from './ref_on.png';
import ref_off from './ref_off.png';

export default function MyHome() {
  const [isBulbOn, setIsBulbOn] = useState(false);
  const [isBulbOn1, setIsBulbOn1] = useState(false);
  const [isBulbOn2, setIsBulbOn2] = useState(false);

  const [isFanOn, SetIsFanOn] = useState(false);
  const [isTvOn, setIsTvOn] = useState(false);
  const [IsRefOn, setIsRefOn] = useState(false);

  const toggleBulb = () => {
    setIsBulbOn(!isBulbOn);
  };

  const toggleBulb1 = () => {
    setIsBulbOn1(!isBulbOn1);
  };

  const toggleBulb2 = () => {
    setIsBulbOn2(!isBulbOn2);
  };
  
  const toggleFan = () => {
    SetIsFanOn(!isFanOn);
  };
  const toggleRef=()=>{setIsRefOn(!IsRefOn)};

  const toggleTV = () =>{
    setIsTvOn (! isTvOn) ;
  }

return (
<div>
  <div className="myHome">
  <Sidebar />
<div className = "main-content">

  <h1 className = "myHomeTitle">Home Page</h1>

<div className = "row1">
 <div className="image">
  <img
    src={isBulbOn ? lightmode : darkmode}
    alt={isBulbOn ? 'On Bulb' : 'Off Bulb'}
    className="bulb-image"
  />
  <button className="toggle-button" onClick={toggleBulb}>
  {isBulbOn ? 'Turn Off' : 'Turn On'}
  </button>
  </div>

 <div className="image1">
  <img
    src={isBulbOn1 ? lightmode : darkmode}
    alt={isBulbOn1 ? 'On Bulb' : 'Off Bulb'}
    className="bulb-image"
  />
  <button className="toggle-button" onClick={toggleBulb1}>
{isBulbOn1 ? 'Turn Off' : 'Turn On'}
</button>
</div>

 <div className="image2">
  <img
    src={isBulbOn2 ? lightmode : darkmode}
    alt={isBulbOn2 ? 'On Bulb' : 'Off Bulb'}
    className="bulb-image"
  />
  <button className="toggle-button" onClick={toggleBulb2}>
{isBulbOn2 ? 'Turn Off' : 'Turn On'}
</button>
</div>
</div>


<div className = "row1">
 <div className="image">
  <img
    src={isFanOn ? fan_on : fan_off}
    alt={isFanOn ? 'On Bulb' : 'Off Bulb'}
    className="bulb-image"
  />
  <button className="toggle-button" onClick={toggleFan}>
  {isFanOn ? 'Turn Off' : 'Turn On'}
  </button>
  </div>

 <div className="image1">
  <img
    src={isTvOn ? tv_on : tv_off}
    alt={isTvOn ? 'On Bulb' : 'Off Bulb'}
    className="bulb-image"
  />
  <button className="toggle-button" onClick={toggleTV}>
{isTvOn ? 'Turn Off' : 'Turn On'}
</button>
</div>

 <div className="image2">
  <img
    src={IsRefOn ? ref_on : ref_off}
    alt={IsRefOn ? 'On Bulb' : 'Off Bulb'}
    className="bulb-image"
  />
  <button className="toggle-button" onClick={toggleRef}>
{IsRefOn ? 'Turn Off' : 'Turn On'}
</button>
</div>
</div>


</div>
</div>
</div>
);
}
