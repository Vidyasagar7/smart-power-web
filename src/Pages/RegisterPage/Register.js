import React from 'react';
import "./Register.css";
import Bulb from '../../images/Bulb.jpg';

const Register = () => {
    return(
        <div className ="registercontainer">
            <div className ="Registerform">
                <div className="nameContainer">
                    <div className="fname">
                        <label><b>First Name</b></label>
                        <input type="text" className="fnamebtn" required/>
                    </div>
                    <div className="lname">
                        <label><b>Last Name</b></label>
                        <input type="text" className="lnamebtn" required/>
                    </div>            
                </div>
                <div className ="emailR">
                    <label for="emailR"><b>Email Address</b></label>
                    <input type="text" className="emailBtnR" required/>
                </div>
                <div className="passwordR">
                    <label for="pass"><b>Password</b></label><br></br>
                    <input type="password" className="pass" name="pass" required/>
                </div>
                <button type="submit" className="registerbtn">Register</button>
                </div>
                <img src ={Bulb} className ="BulbR" />
        </div>
    );
} 

export default Register;