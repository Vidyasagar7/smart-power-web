import React from 'react';

import { Bar } from "react-chartjs-2";

function Barchartdaily(){
    const data ={
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
        <Bar data={data} options ={options}/>
    )
}

export default Barchartdaily;