import React, { useCallback, useContext, useEffect } from "react";
import "./Dashboard.css";
import Barchart from "./Chart.js";
import { actions, GlobalStateContext } from "../../Context/GlobalStateContext";
import { useAuth0 } from "@auth0/auth0-react";
import AuthConfig from "../../Config/AuthConfig";

const getTokenSilentlyOptions = {
  audience: AuthConfig.audience,
  ignoreCache: false,
};


const Dashboard = () => {
  const [state, dispatch] = useContext(GlobalStateContext);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const setAccessToken = useCallback(async () => {
    if (isAuthenticated && !state.acceesToken) {
      const token = await getAccessTokenSilently({
        ...getTokenSilentlyOptions,
      });
      dispatch({
        type: actions.SET_TOKEN,
        payload: token,
      });
    }
  }, [dispatch, getAccessTokenSilently, isAuthenticated, state.acceesToken]);

  useEffect(() => {
    setAccessToken();
  }, [setAccessToken]);

  const data = {
    icpNumber: "HVB0019878",
    location: "6.91202105909924 174.753363144016",
    address: {
      line1: "A4 Kavya Courts",
      line2: "West Ponnurangam Road",
      line3: "Rs puram,",
      line4: "Coimbatore",
    },
    contact: "test@gmail.com",
  };
  return (
    <div className="dashboardContainer">
      <div className="chart">
        <Barchart />
      </div>
      <div className="details">
        <div className="userdetails">
          <p>ICP Number :{data.icpNumber}</p>
          <p>Location : {data.location}</p>
          <p>
            Address : {data.address.line1}
            <br></br>
            {data.address.line2}
            <br></br>
            {data.address.line3}
            <br></br>
            {data.address.line4}
          </p>
          <p>Contact : {data.contact}</p>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
