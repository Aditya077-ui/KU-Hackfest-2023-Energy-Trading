
import './MarketPlace.css';
import Sidebar from '../Sidebar/Sidebar';
import Avatar from 'react-avatar'; 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers'
// import ContractAbi from '../artifacts/contracts/contract.sol/FundTransfer.json'
import ContractAbi from '../MarketPlace/FundTransfer.json'
import {useLocation} from 'react-router-dom';


function Card({ data}) {
  const [contract, setContract] = useState(null);
  const [wallet, setWallet] = useState(null);
  // console.log(data)
  const { pvtAddress, houseNo, amount } = data;

  const transferFunds = async () => {


 
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const walletAddress = accounts[0];
      console.log(walletAddress)
      setWallet(walletAddress);

      // Create a contract instance
      const contract = new ethers.Contract('0x5FbDB2315678afecb367f032d93F642f64180aa3', ContractAbi.abi, signer)
      setContract(contract);
    
    try {
      
      // if(pvtAddress == myAddress){
      //   window.alert('You cannot use buy from your own account')
      // }
      const transferAmount = ethers.utils.parseEther(amount);
      const transaction = await contract.transferFunds(pvtAddress, transferAmount);
      await transaction.wait();

      window.alert('You cannot use buy from your own account')
    } catch (error) {
      console.error('Error transferring funds:', error.message);
    }
  };

  return (
    <div className="marketPlaceCard">
     <div className="user-image" >
      {/* <img src={require("/lightmode.png")} alt="User" className="user-avatar"/>
       */}
      <Avatar name='SA' round={true} size={100} />

     </div>
      <h2><b>Address:</b>{pvtAddress.slice(0, 5) + '...' + pvtAddress.slice(38, 42)}</h2>
      <p><b>amount:</b>{amount}</p>
      <p><b>House No:</b> {houseNo}</p>
      <button className="button" onClick={transferFunds} >Buy</button>
    </div>
  );
}
function MarketPlace(props) {
  const location = useLocation();


  // useEffect(() => {

    



  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/sales/listing/fetch');
  //       // const result = await response.json();
  //       console.log(response.data)
  //       setData(response.data);
  //       console.log(data)
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  //   loadContract()
  //   // Call the fetchData function when the component mounts
  // }, []);





  return (
    <div className="marketPlace">
      <Sidebar/>
      <div className="main-content">
      <h1 className='marketplaceTitle'>MarketPlace</h1>
        {location.state.data.map((data, index) => (
          <Card key={index} data={data}/>
        ))}
      </div>
    </div>
  );
}

export default MarketPlace;
// contract={contract} myAddress={wallet}