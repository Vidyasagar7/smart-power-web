import React from 'react';
import  './LinkAccount.css';
import lightImage from '../../images/Bulb.jpg';
const LinkAccount = () =>{
    return(
        <div className = "Container">
            <div className = "AccountDetails">
                <h3>Welcome User,</h3>
                <p className = "paragraph">You are almost there... Please provide your identification details</p>
                <span className="adharCardText">Adhar Card ID</span><br></br>
                <input type="text" className="textBox" name="email" required /><br></br>
                <button className = "confrimButton">Confirm</button>
            </div>
            <img src ={lightImage} className = "lightimage"></img>
        </div>
    );
}

export default LinkAccount;