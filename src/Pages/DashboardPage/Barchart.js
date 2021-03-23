import React from "react";
import { Bar } from "react-chartjs-2";

const Barchart = ({ chartState }) => {
  var options = {
    resposive: true,
    maintainAspectRatio: true,
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            fontFamily: "'Open Sans', sans-serif",
            fontSize: 14,
            fontColor: "white",
            autoSkip: false
        },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            fontFamily: "'Open Sans', sans-serif",
            fontSize: 14,
            fontColor: "white",
            autoSkip: false
        },
        },
      ],
    },
  };
  return chartState ? (
    <Bar data={chartState} options={options} />
  ) : (
    <Bar options={options} />
  );
};

export default Barchart;
