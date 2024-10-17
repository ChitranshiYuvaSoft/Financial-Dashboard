"use client"
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { useAppSelector } from '../Redux/hooks';
import { RootState } from '../Redux/store';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


interface ChartDataItem {
  id: string;
  sales: string;
  purchase: string;
  month: string;
}

const BarChart = () => {
  const { lineChartData } = useAppSelector((state: RootState) => state.chart);


  const data = {
    labels: lineChartData.map((item: ChartDataItem) => item.month),
    datasets: [
      {
        label: 'Sales for 2023 (in USD)',
        data: lineChartData.map((item: ChartDataItem) => item.sales),
        backgroundColor: ' rgb(56 189 248)',
      },
      {
        label: 'Purchase for 2023 (in USD)',
        data: lineChartData.map((item: ChartDataItem) => item.purchase),
        backgroundColor: 'rgb(99 102 241)',
      }
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales and Purchase Data for 2023',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
