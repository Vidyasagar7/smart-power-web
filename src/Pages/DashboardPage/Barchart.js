import React from "react";
import { Bar } from "react-chartjs-2";

const Barchart = ({ chartState }) => {
  var options = {
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
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
