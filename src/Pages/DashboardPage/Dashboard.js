import React, { useCallback, useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import Barchart from "./Barchart.js";
import axios from "axios";
import { actions, GlobalStateContext } from "../../Context/GlobalStateContext";
import { useAuth0 } from "@auth0/auth0-react";
import AuthConfig from "../../Config/AuthConfig";
import { Link } from "react-router-dom";
import LinkAccount from "../LinkAccount/LinkAccount";

const getTokenSilentlyOptions = {
  audience: AuthConfig.audience,
  ignoreCache: false,
};

const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
const getMonthReadings = (summary) => {
  return months.map((month) => summary[month]);
};

const Dashboard = () => {
  const [state, dispatch] = useContext(GlobalStateContext);
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

  const setAccessToken = useCallback(async () => {
    if (isAuthenticated && !state.accessToken) {
      const token = await getAccessTokenSilently({
        ...getTokenSilentlyOptions,
      });
      dispatch({
        type: actions.SET_TOKEN,
        payload: token,
      });
    }
  }, [dispatch, getAccessTokenSilently, isAuthenticated, state.accessToken]);

  const loadUserDetails = useCallback(async () => {
    if (!state.userDetails) {
      console.log(`User::${JSON.stringify(user)}`);
      console.log(`User Id::${user.sub}`);
      const userDetailsUrl = `http://localhost:3001/api/user/${user.sub}`;
      axios.get(userDetailsUrl).then((response) => {
        if (response.data) {
          dispatch({
            type: actions.SET_USERDETAILS,
            payload: response.data,
          });
        }
      });
    }
  }, [dispatch, state.userDetails, user]);

  const loadMeterDetails = useCallback(
    async (meterId) => {
      const url = `http://localhost:3001/api/meterDetails/${meterId}`;
      axios.get(url).then((response) => {
        dispatch({
          type: actions.SET_METER_DETAILS,
          payload: response.data,
        });
      });
    },
    [dispatch]
  );

  const linkAccount = useCallback(
    async (meterId) => {
      const accountDetails = { userId: `${user.sub}`, meterId: meterId };
      axios
        .post("http://localhost:3001/api/user/linkaccount", accountDetails)
        .then((response) => {
          loadUserDetails();
        });
    },
    [loadUserDetails, user.sub]
  );

  const loadYearlySummary = useCallback(async () => {
    if (state.userDetails) {
      let year = new Date().getFullYear();
      const urlYearly = `http://localhost:3001/api/meter/${state.userDetails.meterId}/monthlysummary/${year}`;
      axios.get(urlYearly).then((response) => {
        const summary = response.data.summary;
        console.log(response.data.summary);
        dispatch({
          type: actions.SET_CHART_DATA,
          payload: {
            labels: months,
            datasets: [
              {
                label: "Power consumption Yearly",
                data: getMonthReadings(summary),
                borderColor: [
                  "rgba(255,0,0,0.8)",
                  "rgba(0,255,0,0.8)",
                  "rgba(0,0,255,0.8)",
                  "rgba(192,192,192,0.8)",
                  "rgba(255,255,0,0.8)",
                  "rgba(255,0,255,0.8)",
                  "rgba(102, 44, 0, 1)",
                  "rgba(41, 255, 223, 1)",
                  "rgba(32, 213, 141, 1)",
                  "rgba(127, 125, 21, 1)",
                  "rgba(112, 103, 81, 1)",
                  "rgba(17, 176, 171, 1)",
                ],
                backgroundColor: [
                  "rgba(255,0,0,0.8)",
                  "rgba(0,255,0,0.8)",
                  "rgba(0,0,255,0.8)",
                  "rgba(192,192,192,0.8)",
                  "rgba(255,255,0,0.8)",
                  "rgba(255,0,255,0.8)",
                  "rgba(102, 44, 0, 1)",
                  "rgba(41, 255, 223, 1)",
                  "rgba(32, 213, 141, 1)",
                  "rgba(127, 125, 21, 1)",
                  "rgba(112, 103, 81, 1)",
                  "rgba(17, 176, 171, 1)",
                ],
              },
            ],
          },
        });
      });
    }
  }, [dispatch, state.userDetails]);

  const setMonthlyData = useCallback(() => {
    //   let sum = array.reduce(function(a, b){
    //     return a + b;
    // }, 0);
    if (state.userDetails) {
      const urlMonthly = `http://localhost:3001/api/meter/${state.userDetails.meterId}/summaries`;
      axios
        .get(urlMonthly, {
          params: {
            fromDate: 20210301,
            toDate: 20210310,
          },
        })
        .then((response) => {
          const arr = response.data;
          const length = arr.length;
          console.log(arr, length);

          dispatch({
            type: actions.SET_CHART_DATA,
            payload: {
              labels: [],
              datasets: [
                {
                  label: "Power consumption monthly",
                  data: [],
                  borderColor: [
                    "rgba(255,0,0,0.8)",
                    "rgba(0,255,0,0.8)",
                    "rgba(0,0,255,0.8)",
                    "rgba(192,192,192,0.8)",
                    "rgba(255,255,0,0.8)",
                    "rgba(255,0,255,0.8)",
                  ],
                  backgroundColor: [
                    "rgba(255,0,0,0.8)",
                    "rgba(0,255,0,0.8)",
                    "rgba(0,0,255,0.8)",
                    "rgba(192,192,192,0.8)",
                    "rgba(255,255,0,0.8)",
                    "rgba(255,0,255,0.8)",
                  ],
                },
              ],
            },
          });
        });
    }
  }, [dispatch, state.userDetails]);

  const setDailyData = useCallback(() => {
    if (state.userDetails) {
      const urlDaily = `http://localhost:3001/api/meter/${state.userDetails.meterId}/dailySummary/20210301`;
      axios.get(urlDaily).then((response) => {
        console.log(response.data.readings);
        dispatch({
          type: actions.SET_CHART_DATA,
          payload: {
            labels: [],
            datasets: [
              {
                label: "Power consumption Daily",
                data: [],
                borderColor: [
                  "rgba(255,0,0,0.8)",
                  "rgba(0,255,0,0.8)",
                  "rgba(0,0,255,0.8)",
                  "rgba(192,192,192,0.8)",
                  "rgba(255,255,0,0.8)",
                  "rgba(255,0,255,0.8)",
                ],
                backgroundColor: [
                  "rgba(255,0,0,0.8)",
                  "rgba(0,255,0,0.8)",
                  "rgba(0,0,255,0.8)",
                  "rgba(192,192,192,0.8)",
                  "rgba(255,255,0,0.8)",
                  "rgba(255,0,255,0.8)",
                ],
              },
            ],
          },
        });
      });
    }
  }, [dispatch, state.userDetails]);

  useEffect(() => {
    setAccessToken();
    loadUserDetails();
  }, [setAccessToken, loadUserDetails]);

  useEffect(() => {
    // Load meter Details and yearly summary only during initial page load
    if (state.userDetails && !state.meterDetails) {
      loadMeterDetails(state.userDetails.meterId);
      loadYearlySummary(state.userDetails.meterId);
    }
  }, [
    dispatch,
    loadMeterDetails,
    loadYearlySummary,
    state.meterDetails,
    state.userDetails,
  ]);

  return (
    <div>
      {!state.userDetails ? (
        <div className="linkAccount">
          <LinkAccount linkAccount={linkAccount} user={user} />
        </div>
      ) : (
        state.chartData && (
          <div className="dashboardContainer">
            <div className="chart">
              {state.meterDetails && <Barchart chartState={state.chartData} />}
              <div className="chartLinks">
                <Link className="link" onClick={loadYearlySummary}>
                  Yearly
                </Link>
                <Link className="link" onClick={setMonthlyData}>
                  Monthly
                </Link>
                <Link className="link" onClick={setDailyData}>
                  Daily
                </Link>
              </div>
            </div>
            <div className="details">
              <div className="userdetails">
                <p>ICP Number :{state.meterDetails.meterId}</p>
                <p>Location : {state.meterDetails.geoLoc}</p>
                <p>
                  Address : {state.meterDetails.houseNumber}
                  <br></br>
                  {state.meterDetails.street}
                  <br></br>
                  {state.meterDetails.state}
                  <br></br>
                  {state.meterDetails.pincode}
                </p>
                <p>User : {user.email}</p>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
export default Dashboard;
