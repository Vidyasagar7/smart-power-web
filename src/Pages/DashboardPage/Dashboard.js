import React from 'react';
import './Dashboard.css';
import Barchart from './Chart.js';


const Dashboard = () => {
    const data = {
        "icpNumber": "HVB0019878",
        "location": "6.91202105909924 174.753363144016",
        "address": {
            "line1": "A4 Kavya Courts",
            "line2": "West Ponnurangam Road",
            "line3": "Rs puram,",
            "line4": "Coimbatore"
        },
        "contact": "test@gmail.com"
    }
    return (
        <div className="dashboardContainer">
            <div className="chart">
                <Barchart />
            </div>
            <div className="details">
                     <div className="userdetails">
                        <p>ICP Number :{data.icpNumber}</p>
                        <p>Location : {data.location}</p>
                        <p>Address : {data.address.line1}<br></br>
                            {data.address.line2}<br></br>
                            {data.address.line3}<br></br>
                            {data.address.line4}</p>
                        <p>Contact : {data.contact}</p>
                    </div>
            </div>
        </div>
    );
}
export default Dashboard;