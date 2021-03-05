import React from 'react';
import { Bar } from "react-chartjs-2";

const Barchart = (props) =>{
    var options = {
        scales: {
            xAxes: [{
                gridLines: {
                    display:false
                }
            }],
            yAxes: [{
                gridLines: {
                    display:false
                }   
            }]
        }
    }
    return(
        <Bar data={props} options = {options} />
    );
}

export default Barchart;    
