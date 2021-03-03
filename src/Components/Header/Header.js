import React, { useCallback } from "react";
import { ReactComponent as SmartPowerLogo } from "../../icons/smart-power-logo.svg";
import "./Header.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useContext } from "react";
import AuthConfig from "../../Config/AuthConfig";
import RoutePath from "../../Routes/RoutePath";
import { actions, GlobalStateContext } from "../../Context/GlobalStateContext";



const loginLandingPage = {
  appState: {
    returnTo: RoutePath.dashboard,
  },
};
const Header = () => {

  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [state, dispatch] = useContext(GlobalStateContext);

  const signup = useCallback(() => {
    loginWithRedirect({
      ...loginLandingPage,
      screen_hint: "signup",
    });
  }, [loginWithRedirect]);

  useEffect(() => {
    console.log(`Global state::::: ${JSON.stringify(state)}`);
  }, [state]);

  const logoutApp = useCallback(() => {
    dispatch({
      type: actions.REMOVE_TOKEN,
    });
    logout({ client_id: AuthConfig.clientId });
  }, [dispatch, logout]);

  return (
    <header>
      <div className="headerContainer">
        <div data-test-id="logo" className="logoConatiner">
          <SmartPowerLogo className="logoIcon" />
          <span className="logoName">Smart Power</span>
        </div>
        <div className="linkContainer">
          {isAuthenticated ? (
            <div className="links">
              <Link to="/Login" className="linker" onClick={() => logoutApp()}>
                Logout
              </Link>
            </div>
          ) : (
            <>
              <div className="links">
                <Link
                  to="/Register"
                  className="linker"
                  onClick={() => signup()}
                >
                  Register
                </Link>
              </div>
              <div className="links">
                <Link
                  to="/Login"
                  className="linker"
                  onClick={() => loginWithRedirect(loginLandingPage)}
                >
                  Login
                </Link>
              </div>
            </>
          )}
          <div className="links">About Us</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
