"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js";
import { useAppSelector } from "../Redux/hooks";
import { RootState } from "../Redux/store";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

interface ChartDataItem {
  id: string;
  sales: string;
  purchase: string;
  month: string;
}

const LineChart = () => {
  const { lineChartData } = useAppSelector((state: RootState) => state.chart);

  const data = {
    labels: lineChartData.map((item: ChartDataItem) => item.month),
    datasets: [
      {
        label: "Sales",
        data: lineChartData.map((item: ChartDataItem) => item.sales),
        borderColor: "#FFC0CB",
        backgroundColor: "rgb(170, 51, 106)",
        fill: false,
        pointStyle: "circle",
      },
      {
        label: "Purchase",
        data: lineChartData.map((item: ChartDataItem) => item.purchase),
        borderColor: "#FFFF00",
        backgroundColor: "#008000",
        fill: false,
        pointStyle: "circle",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
