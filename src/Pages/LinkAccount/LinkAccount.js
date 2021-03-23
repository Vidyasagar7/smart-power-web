import React, { useState } from "react";
import "./LinkAccount.css";
import lightImage from "../../images/Bulb.jpg";

const LinkAccount = ({ linkAccount , user, error}) => {
  const [meterId, setMeterId] = useState("");
  return (
    <div className="Container">
      <div className="AccountDetails">
        <h3>Welcome {user.name},</h3>
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
        {error && <div className ="error"> {error} </div>}

      </div>
      <img src={lightImage} className="lightimage"></img>
    </div>
  );
};

export default LinkAccount;
