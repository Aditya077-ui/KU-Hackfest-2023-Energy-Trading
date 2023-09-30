import React from 'react';
import './MarketPlace.css';
import Sidebar from '../Sidebar/Sidebar';
import Avatar from 'react-avatar'; 

function Card({ data }) {
  const { username, address, houseNo,  } = data;

  return (
    <div className="marketPlaceCard">
     <div className="user-image" >
      {/* <img src={require("/lightmode.png")} alt="User" className="user-avatar"/>
       */}
      <Avatar name={username} round={true} size={100} />

     </div>
      <h2><b>Name:</b>{username}</h2>
      <p><b>Address:</b>{address}</p>
      <p><b>House No:</b> {houseNo}</p>
      <button className="button">Buy</button>
    </div>
  );
}
function MarketPlace() {
  const cardData = [
    {
      username: 'John Doe',
      address: '123 Main St',
      houseNo: 'A1',
    },
    {
      username: 'Jane Smith',
      address: '456 Elm St',
      houseNo: 'B2',
    },
    {
      username: 'John Doe',
      address: '123 Main St',
      houseNo: 'A1',
    },
    {
      username: 'Jane Smith',
      address: '456 Elm St',
      houseNo: 'B2',
    },
    {
      username: 'John Doe',
      address: '123 Main St',
      houseNo: 'A1',
    },
    {
      username: 'Jane Smith',
      address: '456 Elm St',
      houseNo: 'B2',
    },
    {
      username: 'John Doe',
      address: '123 Main St',
      houseNo: 'A1',
    },
    {
      username: 'Jane Smith',
      address: '456 Elm St',
      houseNo: 'B2',
    },
    {
      username: 'John Doe',
      address: '123 Main St',
      houseNo: 'A1',
    },
    {
      username: 'Jane Smith',
      address: '456 Elm St',
      houseNo: 'B2',
    },
  ];

  return (
    <div className="marketPlace">
      <Sidebar/>
      <div className="main-content">
      <h1 className='marketplaceTitle'>MarketPlace</h1>
        {cardData.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>
    </div>
  );
}

export default MarketPlace;