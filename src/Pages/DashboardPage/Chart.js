import React from 'react';
import { Bar } from "react-chartjs-2";

const Barchart = () =>{
    const data ={
        labels: ['Jan','Feb','Mar','Apr','May','Jun'],
        datasets:[
            {
                label: 'Power consumption in 2020',
                data: [100,48,63,82,29,70],
                borderColor: ['rgba(255,0,0,0.8)','rgba(0,255,0,0.8)','rgba(0,0,255,0.8)','rgba(192,192,192,0.8)','rgba(255,255,0,0.8)','rgba(255,0,255,0.8)'],
                backgroundColor: ['rgba(255,0,0,0.8)','rgba(0,255,0,0.8)','rgba(0,0,255,0.8)','rgba(192,192,192,0.8)','rgba(255,255,0,0.8)','rgba(255,0,255,0.8)']
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
        <Bar data={data} options = {options} />
    );
}

export default Barchart;    
