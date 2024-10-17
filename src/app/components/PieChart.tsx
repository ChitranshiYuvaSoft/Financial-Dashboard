"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { RootState } from "../Redux/store";
import { useAppSelector } from "../Redux/hooks";

ChartJS.register(ArcElement, Tooltip, Legend);

interface LineChartData {
  id: string;
  sales: string;
  purchase: string;
  month: string;
}

const PieChart = () => {
  const { lineChartData } = useAppSelector((state: RootState) => state.chart);
  console.log(lineChartData);

  const totalSales = lineChartData.reduce(
    (accumulator: number, current: LineChartData) => {
      const salesInNumber = parseInt(current.sales);
      return accumulator + salesInNumber;
    },
    0
  );
  const totalPurchase = lineChartData.reduce(
    (accumulator: number, current: LineChartData) => {
      const purchaseInNumber = parseInt(current.purchase);
      return accumulator + purchaseInNumber;
    },
    0
  );

  console.log(totalSales, totalPurchase);

  const chartData = {
    labels: ["Sales", "Purchase"],
    datasets: [
      {
        label: "Pie Chart Example",
        data: [totalSales, totalPurchase],
        backgroundColor: ["#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#36A2EB", "#FFCE56"],
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;
