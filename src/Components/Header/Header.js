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
              <div className="links">
                <Link to = '/Register' className = "linker">
                  Register
                  </Link>
              </div>
              <div className="links">
                <Link to ='/Login' className = "linker" >
                  Login
                </Link>
              </div>
              <div className="links">
                  About Us
              </div>
            </div>
      </div>
    </header>
  );
};

export default Header;
