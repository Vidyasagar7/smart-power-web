import React from 'react';
import { Bar } from "react-chartjs-2";

function Barchart(){
    const data ={
        labels: ['Jan','Feb','Mar','Apr','May','Jun'],
        datasets:[
            {
                label: 'Power consumption in 2020',
                data: [100,48,63,82,29,70],
                borderColor: ['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(192,192,192,0.3)','rgba(255,255,0,0.3)','rgba(255,0,255,0.3)'],
                backgroundColor: ['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(192,192,192,0.3)','rgba(255,255,0,0.3)','rgba(255,0,255,0.3)']
            }
        ]
    }
    
    return(
        <Bar data={data} />
    );
}

export default Barchart;    
