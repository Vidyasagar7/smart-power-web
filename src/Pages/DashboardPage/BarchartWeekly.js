import React from 'react';
import { Bar } from "react-chartjs-2";

function Barchartweekly(){
    const data ={
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

export default Barchartweekly;