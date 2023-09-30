import React, { Component } from "react";
import "./auth.css"; // Import your custom CSS file

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      homeId: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // You can perform form submission or validation logic here
    // For example, you can send the data to a server or update the state
  };

  render() {
    return (
      <div className="loginPage">
        <div className="login-container">
        <div className='flex justify-center items-center'>
      <img src={require('./urja_logo.png')} alt="Urja Logo" className='logoImage' />
    </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="homeId">Home ID:</label>
            <input
              type="text"
              id="homeId"
              name="homeId"
              value={this.state.homeId}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit" className="signup-button">
            Signup
          </button>
        </form>
      </div>
      </div>
    );
  }
}

export default Login;
