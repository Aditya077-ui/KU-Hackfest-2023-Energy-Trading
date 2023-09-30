import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./MyHome.css";
import bulbOn from "./bulbOn.jpg";
import bulbOff from "./bulbOff.jpg";
import darkHouse from "./darkHouse.jpg";
import lightHouse from "./lightHouse.png";
import axios from "axios";

const devices = {
  bulb: false,
};

export default function MyHome() {
  const [isBulbOn, setIsBulbOn] = useState(false);

  const toggleBulb = () => {
    setIsBulbOn(!isBulbOn);
  };

  function turnBulbOn() {
    devices["bulb"] = true;
    setTimeout(async () => {
      let currentTime = new Date();
      axios
        .put("http://localhost:4000/api/energy/consumed", {
          pvtAddress: "aaaaaaaaaa",
          date: `${currentTime.getFullYear()}:${
            currentTime.getMonth() + 1
          }:${currentTime.getDay()}`,
          time: `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`,
          energy: 5,
        })
        .then(function (response) {
          // handle success
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
      toggleBulb();
    }, 10000);
  }

  function turnFanOn() {
    devices["bulb"] = true;
    setTimeout(async () => {
      let currentTime = new Date();
      axios
        .put("http://localhost:4000/api/energy/consumed", {
          pvtAddress: "aaaaaaaaaa",
          date: `${currentTime.getFullYear()}:${
            currentTime.getMonth() + 1
          }:${currentTime.getDay()}`,
          time: `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`,
          energy: 5,
        })
        .then(function (response) {
          // handle success
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
      toggleBulb();
    }, 10000);
  }

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
                {isBulbOn ? turnBulbOn() : () => {}}
              </button>
              <img
                src={isBulbOn ? bulbOn : bulbOff}
                alt={isBulbOn ? "On Bulb" : "Off Bulb"}
                className="bulb-image"
              />
              <div></div>
            </div>
            <div className="row2">
              <img
                src={isBulbOn ? lightHouse : darkHouse}
                alt={isBulbOn ? "On Bulb" : "Off Bulb"}
                className="house-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
