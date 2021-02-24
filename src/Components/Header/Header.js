import React from "react";
import { ReactComponent as SmartPowerLogo } from "../../icons/smart-power-logo.svg";
import "./Header.css";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="headerContainer">
        <div data-test-id="logo" className="logoConatiner">
          <SmartPowerLogo className="logoIcon" />
          <span className="logoName">Smart Power</span>
        </div>
        <div className="linkContainer">
            <div className="register">
              <Link to = '/Register' className = "linkR">
                Register
                </Link>
            </div>
            <div className="login">
              <Link to ='/Login' className = "linkLogin" >
                Login
              </Link>
            </div>
            <div className="aboutUs">
                About Us
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
