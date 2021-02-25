import React from 'react';
import './Login.css';
import Bulb from '../../images/Bulb.jpg';
import Google from '../../icons/google.svg';
import Facebook from '../../icons/facebook.svg'

const Login =() =>{
    return(
        <div className="logincontainer">
            <div className ="loginBox">
                <div className="email">
                    <label for="email"><b>Email Address</b></label>
                    <input type="text" className="emailbtn" name="email" required/>
                </div>
                <div className="password">
                    <label for="psw"><b>Password</b></label>
                    <input type="password" className="passwordbtn" name="psw" required/>
                </div>
                <div className ="submit">
                    <button type="submit" className="loginbtn">Login</button>
                    <div className="forgotpwd">Forgot password?</div>
                </div>
                <div className = "socialmediacontainer">
                    <div className = "Google">
                        <button className="loginButton"><img src ={Google} className ="image" />Sign in with Google</button>
                    </div>
                    <div className = "Facebook">
                        <button className="loginButton"> <img src ={Facebook} className ="image" />Sign in with Facebook
                        </button>
                    </div>
                </div>
            </div>
            <img src = {Bulb} className = "lightimage" alt = " "/>
        </div>
    );
}
export default Login;