import React, { useCallback, useContext, useEffect } from "react";
import moment from "moment";
import "./Dashboard.css";
import Barchart from "./Barchart.js";
import axios from "axios";
import { actions, GlobalStateContext } from "../../Context/GlobalStateContext";
import AppConfig from "../../Config/AppConfig";
import AuthConfig from "../../Config/AuthConfig";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import LinkAccount from "../LinkAccount/LinkAccount";
import Loader from "react-loader-spinner";

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
const dailyReadingDateFormat = "YYYYMMDD";

const monthlyBorderColor = [
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
];
const getMonthReadings = (summary) => {
  return months.map((month) => summary[month]);
};
const capitalizeFirstLetter = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const getSum = (a, b) => {
  return a + b;
};
const Dashboard = () => {
  const [state, dispatch] = useContext(GlobalStateContext);
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

  const setIsLoading = useCallback(
    (isLoading) => {
      dispatch({
        type: actions.SET_IS_LOADING,
        payload: isLoading,
      });
    },
    [dispatch]
  );

  const fetchData = useCallback(
    async (url, params) => {
      if (state.accessToken) {
        setIsLoading(true);

        const config = {
          baseURL: AppConfig.apiBaseUrl,
          params: params,
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          },
        };
        const response = await axios.get(url, config);
        setIsLoading(false);
        return response;
      }
    },
    [setIsLoading, state.accessToken]
  );

  const postData = useCallback(
    async (url, payload) => {
      if (state.accessToken) {
        setIsLoading(true);

        const config = {
          baseURL: AppConfig.apiBaseUrl,
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          },
        };

        const response = await axios.post(url, payload, config);
        setIsLoading(false);
        return response;
      }
    },
    [setIsLoading, state.accessToken]
  );

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
    if (state.accessToken && !state.userDetails) {
      const userDetailsUrl = `/user/${user.sub}`;

      const response = await fetchData(userDetailsUrl);
      dispatch({
        type: actions.SET_USERDETAILS,
        payload: response.data,
      });
    }
  }, [dispatch, fetchData, state.accessToken, state.userDetails, user]);

  const loadMeterDetails = useCallback(
    async (meterId) => {
      const url = `meterDetails/${meterId}`;
      setIsLoading(true);
      const response = await fetchData(url);
      dispatch({
        type: actions.SET_METER_DETAILS,
        payload: response.data,
      });
    },
    [dispatch, fetchData, setIsLoading]
  );

  const linkAccount = useCallback(
    async (meterId) => {
      const accountDetails = { userId: `${user.sub}`, meterId: meterId };
      await postData(`/user/linkaccount`, accountDetails);
      loadUserDetails();
    },
    [loadUserDetails, postData, user.sub]
  );

  const loadMonthlySummary = useCallback(async () => {
    if (state.userDetails) {
      let year = new Date().getFullYear();
      const urlYearly = `/meter/${state.userDetails.meterId}/monthlysummary/${year}`;
      const response = await fetchData(urlYearly);
      console.log(response.data.summary);
      dispatch({
        type: actions.SET_CHART_DATA,
        payload: {
          labels: months.map((month) => capitalizeFirstLetter(month)),
          datasets: [
            {
              label: "Monthly Power Consumption",
              data: getMonthReadings(response.data.summary),
              backgroundColor: monthlyBorderColor,
            },
          ],
        },
      });
    }
  }, [dispatch, fetchData, state.userDetails]);

  const getDailyData = useCallback(async () => {
    if (state.userDetails) {
      const urlMonthly = `/meter/${state.userDetails.meterId}/summaries`;
      const params = {
        fromDate: new moment().startOf("month").format(dailyReadingDateFormat),
        toDate: new moment().format(dailyReadingDateFormat),
      };
      const response = await fetchData(urlMonthly, params);
      dispatch({
        type: actions.SET_CHART_DATA,
        payload: {
          labels: Array(response.data.length)
            .fill()
            .map((x, i) => i + 1),
          datasets: [
            {
              label: "Daily Power Consumption",
              data: response.data.map((reading) =>
                reading.readings.reduce(getSum, 0)
              ),
              backgroundColor: "rgba(17, 176, 171, 1)",
            },
          ],
        },
      });
    }
  }, [dispatch, fetchData, state.userDetails]);

  const getHourlyData = useCallback(async () => {
    if (state.userDetails) {
      const urlDaily = `/meter/${state.userDetails.meterId}/dailySummary/20210301`;
      const response = await fetchData(urlDaily);
      dispatch({
        type: actions.SET_CHART_DATA,
        payload: {
          labels: Array(response.data.readings.length)
            .fill()
            .map((x, i) => i + 1),
          datasets: [
            {
              label: "Hourly Power Consumption",
              data: response.data.readings,
              backgroundColor: "rgb(235, 229, 52)",
            },
          ],
        },
      });
    }
  }, [dispatch, fetchData, state.userDetails]);

  useEffect(() => {
    setAccessToken();
    loadUserDetails();
  }, [setAccessToken, loadUserDetails]);

  useEffect(() => {
    // Load meter Details and yearly summary only during initial page load
    if (state.userDetails && !state.meterDetails) {
      loadMeterDetails(state.userDetails.meterId);
      loadMonthlySummary(state.userDetails.meterId);
    }
  }, [
    dispatch,
    loadMeterDetails,
    loadMonthlySummary,
    state.meterDetails,
    state.userDetails,
  ]);

  return (
    <div>
      {!state.isLoading && !state.userDetails ? (
        <div className="linkAccount">
          <LinkAccount linkAccount={linkAccount} user={user} error={null} />
        </div>
      ) : (
        state.meterDetails && (
          <div className="dashboardContainer">
            <div className="chart">
              <div className="wrapper">
                {state.isLoading ? (
                  <div className="loader">
                    <Loader
                      type="Puff"
                      color="#00BFFF"
                      height={50}
                      width={50}
                    />
                  </div>
                ) : (
                  state.chartData && <Barchart chartState={state.chartData} />
                )}
              </div>
              <div className="chartLinks">
                <Link
                  className="link"
                  to="/Dashboard"
                  onClick={loadMonthlySummary}
                >
                  Monthly
                </Link>
                <Link className="link" to="/Dashboard" onClick={getDailyData}>
                  Daily
                </Link>
                <Link className="link" to="/Dashboard" onClick={getHourlyData}>
                  Hourly
                </Link>
              </div>
            </div>
            <div className="details">
              <div className="userdetails">
                <p>Meter ID: {state.meterDetails.meterId}</p>
                <p>Location: {state.meterDetails.geoLoc}</p>
                <p>
                  Address: {state.meterDetails.houseNumber}
                  <br></br>
                  {state.meterDetails.street}
                  <br></br>
                  {state.meterDetails.state}
                  <br></br>
                  {state.meterDetails.pincode}
                </p>
                <p>User: {user.email}</p>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
export default Dashboard;
