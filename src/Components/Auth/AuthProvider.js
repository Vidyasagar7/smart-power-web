import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import AuthConfig from "../../Config/AuthConfig";

const AuthProvider = ({ children }) => {
  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={AuthConfig.domain}
      clientId={AuthConfig.clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={AuthConfig.audience}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
