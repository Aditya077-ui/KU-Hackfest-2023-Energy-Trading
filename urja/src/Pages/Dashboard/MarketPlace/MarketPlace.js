import React from 'react';
import './MarketPlace.css';
import Sidebar from '../Sidebar/Sidebar';

function Card(props) {
  return (
    <div className="marketPlaceCard">
    </div>
  );
}

function MarketPlace() {
  const cardData = [1,2,3,4,5,6,7,8];

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