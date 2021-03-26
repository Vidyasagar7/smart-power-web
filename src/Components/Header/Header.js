import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as SmartPowerLogo } from "../../icons/smart-power-logo.svg";
import "./Header.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import AuthConfig from "../../Config/AuthConfig";
import RoutePath from "../../Routes/RoutePath";
import { actions, GlobalStateContext } from "../../Context/GlobalStateContext";

const loginLandingPage = {
  appState: {
    returnTo: RoutePath.dashboard,
  },
};
const Header = (props) => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [state, dispatch] = useContext(GlobalStateContext);

  const history = useHistory();

  const gotoHomePage = () => {
    let path = `/`;
    history.push(path);
  };
  const login = useCallback(() => {
    dispatch({
      type: actions.SET_IS_LOADING,
      payload: true,
    });
    loginWithRedirect(loginLandingPage);
  }, [dispatch, loginWithRedirect]);

  const signup = useCallback(() => {
    loginWithRedirect({
      ...loginLandingPage,
      screen_hint: "signup",
    });
  }, [loginWithRedirect]);

  const logoutApp = useCallback(() => {
    dispatch({
      type: actions.LOGOUT,
    });
    logout({ returnTo: `${window.location.origin}${RoutePath.home}` });
  }, [dispatch, logout]);

  return (
    <header>
      <div className="headerContainer">
        <div
          data-test-id="logo"
          className="logoConatiner"
          onClick={gotoHomePage}
        >
          <SmartPowerLogo className="logoIcon" />
          <span className="logoName">Smart Power</span>
        </div>
        <div className="linkContainer">
          {isAuthenticated ? (
            <>
              <div className="links">
                <Link to="/Dashboard" className="linker">
                  My Usage
                </Link>
              </div>
              <div className="links">
                <Link to="/" className="linker" onClick={logoutApp}>
                  Logout
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="links">
                <Link to="/" className="linker" onClick={signup}>
                  Register
                </Link>
              </div>
              <div className="links">
                <Link to="/" className="linker" onClick={login}>
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
