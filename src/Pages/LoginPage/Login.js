import React ,{useContext,useEffect} from "react";
import "./Login.css";
import Bulb from "../../images/Bulb.jpg";
import Google from "../../icons/google.svg";
import Facebook from "../../icons/facebook.svg";
import { actions, GlobalStateContext } from "../../Context/GlobalStateContext";
const Login = () => {
const [state,dispatch] = useContext(GlobalStateContext);
  
  const login = () => {
    dispatch({
      type: actions.LOGIN_SUCCESS,
      payload: "test",
    });
  };

  const logout = () => {
    dispatch({
      type: actions.LOGOUT,
    });
  };

  useEffect(() =>{
    console.log(`Globalstate: ${JSON.stringify(state)}`);
  },[state]);

  return (
    <div className="loginContainer">
      <div className="loginBox">
        <span className="emailPasswordText">Email Address</span>
        <input type="text" className="textBox" name="email" required />

        <span className="emailPasswordText">Password</span>
        <input type="password" className="textBox" name="password" required />

        <div className="submitButton">
          <button type="submit" className="loginButton" onClick = {() => login()}>
            Login
          </button>
          <span className="forgotPassword" onClick = {() => logout()}>Forgot password?</span>
        </div>
        <div className="socialMediaContainer">
          
            <button className="sociaLoginButton">
              <img src={Google} className="image" />
              Sign in with Google
            </button>
            <button className="sociaLoginButton">
              <img src={Facebook} className="image" />
              Sign in with Facebook
            </button>
        </div>
      </div>
      <img src={Bulb} className="lightImage" alt=" " />
    </div>
  );
};
export default Login;
