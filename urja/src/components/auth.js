import React, { useState } from "react";
import "./auth.css"; // Import your custom CSS file
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import {Link, Navigate, useNavigate} from "react-router-dom"

const Login = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  // const { data } = props.location.state;
  const [formData, setFormData] = useState({
    username: "",
    homeId: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform form submission or validation logic here
    // For example, you can send the data to a server or update the state
  };

  const signIn = async () => {
    try {

      const response = await axios.post('http://localhost:8000/api/user/signup', {
          "userName": formData.username,
          "pvtAddress" : location.state.pvtAddress,
          "houseNo": formData.homeId
      });
      navigate('/myprofile',{state:{pvtAddress: location.state.pvtAddress}});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginPage">
      <div className="login-container">
        <div className='flex justify-center items-center'>
          <img src={require('./Asset.png')} alt="Urja Logo" className='logoImage' />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="homeId">Home ID:</label>
            <input
              type="text"
              id="homeId"
              name="homeId"
              value={formData.homeId}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="signup-button" onClick={signIn}>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
