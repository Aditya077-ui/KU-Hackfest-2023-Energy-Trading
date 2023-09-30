import React from 'react';
import './MyProfile.css';
import Sidebar from '../Sidebar/Sidebar';

function Card(props) {
  return (
    <div className="myProfileCard">
    </div>
  );
}

function MyProfile() {
  const cardData = [1,2,3,4];

  return (
    <div className="myProfile">
      <Sidebar/>
      <div className="main-content">
        <h1 className='myProfileTitle'>My Profile</h1>
        {cardData.map((data, index) => (
          <Card key={index} data={data} />
        ))}
        <button type="submit" className="myProfileButton">
            Sell Saugat Veda
        </button>
      </div>
    </div>
  );
}

export default MyProfile;
