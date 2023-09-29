// import react from "react";
// import "./auth.css";

// export default function Login() {
//     return (
//       <div className='signupContainer'>
//           <div className='signupForm'>
//               <form className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-400 p-8 px-8'>
//                   <div className='flex flex-col text-gray-300 py-2'>
//                       <label>Username</label>
//                       <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" />
//                   </div>
//                   <div className='flex flex-col text-gray-300 py-2'>
//                       <label>Home ID</label>
//                       <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" />
//                   </div>
//                   <button className='w-full my-5 py-2 bg-teal-700 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>Sign Up</button>
//               </form>
//           </div>
//       </div>
//     )
//   }
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
