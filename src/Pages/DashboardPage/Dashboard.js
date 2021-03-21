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

const weeklyData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Power consumption weekly",
      data: [66, 22, 13, 55],
      borderColor: [
        "rgba(255,0,0,0.8)",
        "rgba(0,255,0,0.8)",
        "rgba(0,0,255,0.8)",
        "rgba(192,192,192,0.8)",
      ],
      backgroundColor: [
        "rgba(255,0,0,0.8)",
        "rgba(0,255,0,0.8)",
        "rgba(0,0,255,0.8)",
        "rgba(192,192,192,0.8)",
      ],
    },
  ],
};

const dailyData = {
  labels: ["12am-8am", "8am-4pm", "4pm-11:59pm"],
  datasets: [
    {
      label: "Power consumption daily",
      data: [37, 40, 50],
      borderColor: [
        "rgba(255,0,0,0.8)",
        "rgba(0,255,0,0.8)",
        "rgba(0,0,255,0.8)",
      ],
      backgroundColor: [
        "rgba(255,0,0,0.8)",
        "rgba(0,255,0,0.8)",
        "rgba(0,0,255,0.8)",
      ],
    },
  ],
};
const Dashboard = () => {
  const [state, dispatch] = useContext(GlobalStateContext);
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const [chartState, setChartState] = useState(null);

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
  const [userdetails, setUserDetails] = useState(null);

  const loadUserDetails = useCallback(async () => {
    if (isAuthenticated) {
      console.log(`User::${JSON.stringify(user)}`);
      console.log(`User Id::${user.sub}`);
      const userDetailsUrl = `http://localhost:3001/api/user/${user.sub}`;
      axios.get(userDetailsUrl).then((response) => {
        if (response.data) {
          setUserDetails((state) => ({ ...state, ...response.data }));
        }
      });
    }
  }, [isAuthenticated, user]);

  const [meterDetails, setMeterDetails] = useState(null);
  const loadMeterDetails = useCallback(async (meterId) => {
    const url = `http://localhost:3001/api/meterDetails/${meterId}`;
    axios.get(url).then((response) => {
      setMeterDetails((state) => ({ ...state, ...response.data }));
    });
  }, []);
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

  const loadYearlySummary = useCallback(async (meterId) => {
    let year = new Date().getFullYear()
    const urlYearly = `http://localhost:3001/api/meter/${meterId}/monthlysummary/${year}`;
    axios
      .get(urlYearly)
      .then((response) => {
       const summary = response.data.summary;
       const months = ["jan", "feb" ,"mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
       const getMonthReadings = (summary) =>{
         return months.map(month => summary[month]);
       }
        console.log(response.data.summary);
        setChartState((chartState)=>({...chartState,
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
        }));
      });
  }, []);

  // const loadYearlySummary = useCallback(async () => {
  //   axios
  //     .get(urlYearly, {
  //       params: {
  //         year: new Date().getFullYear(),
  //       },
  //     })
  //     .then((response) => {
  //       setYearylySummary(response.data);
  //     });

  // }, [urlYearly]);

  // const [monthlysummary, setMonthlySummary] = useState({});
  // const urlMonthly = "http://localhost:3001/api/meter/:meterId/summaries";

  // const loadMonthlySummary = useCallback(async () => {
  //   axios.get(urlMonthly).then((response) => {
  //     setMonthlySummary(response.data);
  //   });
  // }, [urlMonthly]);

  // const [dailySummary, setDailySummary] = useState({});
  // const urlDaily =
  //   "http://localhost:3001/api/meter/:meterId/dailySummary/:dateEpochMilli";

  // const loadDailySummary = useCallback(async () => {
  //   axios.get(urlDaily,{
  //     params:{
  //       meterId : userdetails.meterId
  //     }
  //   }).then((response) => {
  //     setDailySummary(response.data);
  //   });
  // }, [urlDaily]);

  // const setMonthlyData = useCallback(() => {
  //   setChartState({ ...chartState, ...monthlyData });
  // }, [chartState]);

  const setMonthlyData = useCallback((meterId) => {
    const urlMonthly = `http://localhost:3001/api/meter/${meterId}/summaries`;
    axios
      .get(urlMonthly,{
        params:{
          fromDate :20210301 ,
          toDate :20210310,
        }
      })
      .then((response) => {
        const arr = response.data;
        const length = arr.length;
        console.log(arr,length);
        setChartState((chartState) =>({...chartState ,
          labels:[] ,
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
        }));
      });
  }, []);

  const setDailyData = useCallback((meterId) => {
    const date = Date.now();
    const urlDaily = `http://localhost:3001/api/meter/${meterId}/dailySummary/${date}`;
    axios
      .get(urlDaily)
      .then((response) => {
        console.log(response.data);
        setChartState((chartState)=>({...chartState,
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Aug","Sep","Oct","Nov","Dec"],
          datasets: [
            {
              label: "Power consumption Yearly",
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
        }));
      });
  }, []);

  useEffect(() => {
    setAccessToken();
    loadUserDetails();
  }, [setAccessToken, loadUserDetails]);

  useEffect(() => {
    if (userdetails) {
      loadMeterDetails(userdetails.meterId);
      loadYearlySummary(userdetails.meterId);
    }
  }, [loadMeterDetails, userdetails, loadYearlySummary]);

  return (
    <div>
      {!userdetails ? (
        <div className="linkAccount">
          <LinkAccount linkAccount={linkAccount} user = {user}  />
        </div>
      ) : (
        meterDetails && (
          <div className="dashboardContainer">
            <div className="chart">
              {chartState && <Barchart chartState={chartState} />}
              <div className="chartLinks">
                <Link className="link" onClick={() => loadYearlySummary(userdetails.meterId)}>
                  Yearly
                </Link>
                <Link className="link" onClick={() => setMonthlyData(userdetails.meterId)}>
                  Monthly
                </Link>
                <Link className="link" onClick={() => setDailyData(userdetails.meterId)}>
                  Daily
                </Link>
              </div>
            </div>
            <div className="details">
              <div className="userdetails">
                <p>ICP Number :{meterDetails.meterId}</p>
                <p>Location : {meterDetails.geoLoc}</p>
                <p>
                  Address : {meterDetails.houseNumber}
                  <br></br>
                  {meterDetails.street}
                  <br></br>
                  {meterDetails.state}
                  <br></br>
                  {meterDetails.pincode}
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
