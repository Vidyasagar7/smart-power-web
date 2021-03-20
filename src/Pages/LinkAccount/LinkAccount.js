import React, { useState } from "react";
import "./LinkAccount.css";
import lightImage from "../../images/Bulb.jpg";

const LinkAccount = ({ linkAccount }) => {
  const [meterId, setMeterId] = useState("");
  return (
    <div className="Container">
      <div className="AccountDetails">
        <h3>Welcome User,</h3>
        <p className="paragraph">
          You are almost there... Please provide your house smart meter serial number
        </p>
        <span className="meterText">Meter ID</span>
        <br></br>
        <input
          type="text"
          value={meterId}
          className="textBox"
          name="meterId"
          onChange={(e) => setMeterId(e.target.value)}
          required
        />
        <br></br>
        <button className="confrimButton" onClick={() => linkAccount(meterId)}>
          Confirm
        </button>
      </div>
      <img src={lightImage} className="lightimage"></img>
    </div>
  );
};

export default LinkAccount;
