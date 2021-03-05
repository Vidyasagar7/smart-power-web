import React, { useCallback, useContext, useEffect,useState } from "react";
import "./Dashboard.css";
import Barchart from "./Barchart.js";
import { actions, GlobalStateContext } from "../../Context/GlobalStateContext";
import { useAuth0 } from "@auth0/auth0-react";
import AuthConfig from "../../Config/AuthConfig";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import Barchartweekly from "./BarchartWeekly";
import Barchartdaily from "./BarchartDaily";

const getTokenSilentlyOptions = {
  audience: AuthConfig.audience,
  ignoreCache: false,
};
const monthlyData = {
  labels: ['Jan','Feb','Mar','Apr','May','Jun'],
  datasets:[
      {
          label: 'Power consumption Monthly',
          data: [100,48,63,82,29,70],
          borderColor: ['rgba(255,0,0,0.8)','rgba(0,255,0,0.8)','rgba(0,0,255,0.8)','rgba(192,192,192,0.8)','rgba(255,255,0,0.8)','rgba(255,0,255,0.8)'],
          backgroundColor: ['rgba(255,0,0,0.8)','rgba(0,255,0,0.8)','rgba(0,0,255,0.8)','rgba(192,192,192,0.8)','rgba(255,255,0,0.8)','rgba(255,0,255,0.8)']
      }
  ]
}
const weeklyData = {
labels: ['Week 1','Week 2','Week 3','Week 4'],
  datasets:[
      {
          label: 'Power consumption weekly',
          data: [66,22,13,55],
          borderColor: ['rgba(255,0,0,0.8)','rgba(0,255,0,0.8)','rgba(0,0,255,0.8)','rgba(192,192,192,0.8)'],
          backgroundColor: ['rgba(255,0,0,0.8)','rgba(0,255,0,0.8)','rgba(0,0,255,0.8)','rgba(192,192,192,0.8)']
      }
  ]
}

const dailyData = {
labels: ['12am-8am','8am-4pm','4pm-11:59pm'],
  datasets:[
      {
          label: 'Power consumption daily',
          data: [37,40,50],
          borderColor: ['rgba(255,0,0,0.8)','rgba(0,255,0,0.8)','rgba(0,0,255,0.8)'],
          backgroundColor: ['rgba(255,0,0,0.8)','rgba(0,255,0,0.8)','rgba(0,0,255,0.8)']
      }
  ]
}
const Dashboard = () => {
  const [state, dispatch] = useContext(GlobalStateContext);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const[chartState,setChartState] = useState(null);
  

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

  const setMonthlyData = useCallback(() =>{
    setChartState({...chartState, ...monthlyData});
  },[]);

  const setWeeklyData = useCallback(() =>{
    setChartState({...chartState, ...weeklyData});
  },[]);

  const setDailyData = useCallback(() =>{
    setChartState({...chartState, ...dailyData});
  },[]);


  useEffect(() => {
    setAccessToken();
    setMonthlyData();
  }, [setAccessToken,setMonthlyData]);

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
    <Router>
      <div className="dashboardContainer">
        <div className="chart">
          {chartState && <Barchart props={chartState} />}
          <button onClick={()=> setMonthlyData()}>Monthly</button>
          <button onClick={()=> setWeeklyData()}>Weekly</button>
          <button onClick={()=> setDailyData()}>Daily</button>
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
    </Router>
  );
};
export default Dashboard;
