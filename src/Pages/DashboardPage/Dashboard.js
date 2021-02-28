import React from 'react';
import './Dashboard.css';
import Barchart from './Chart.js';
import Data from './data.json';

const Dashboard = () => {
    return(
        <div className = "dashboardcontainer">
            <div className = "chart">
                <Barchart />
            </div>
            <div className = "details">
                {Data.map( (postDetail,index) => {
                    return <div className = "userdetails">
                        <p>ICP Number :{postDetail.icpNumber}</p>
                        <p>Location : {postDetail.location}</p>
                        <p>Address : {postDetail.address.line1}<br></br>
                            {postDetail.address.line2}<br></br>
                            {postDetail.address.line3}<br></br>
                            {postDetail.address.line4}</p>
                        <p>Contact : {postDetail.contact}</p>
                    </div>
                } )}
            </div>
        </div>
    );
}
export default Dashboard;