import React from "react";
import { Bar } from "react-chartjs-2";

const Barchart = ({ chartState }) => {
  var options = {
    resposive: true,
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontSize: 16,
        fontColor: "white",
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: true,
          },
          ticks: {
            fontFamily: "'Open Sans', sans-serif",
            fontSize: 14,
            fontColor: "white",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: true,
          },
          ticks: {
            fontFamily: "'Open Sans', sans-serif",
            fontSize: 14,
            fontColor: "white",
          },
        },
      ],
    },
  };
  return <Bar data={chartState} options={options} />;
};

export default Barchart;
