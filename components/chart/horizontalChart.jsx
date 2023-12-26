'use client';
import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
Chart.register(...registerables);

const location = ['Tangcit', 'Puri Indah', 'summarecon', 'jakarta', 'tangsel', 'block m']

const HorizontalBarChart = (props) => {
  const data = {
    labels: location,
    datasets: [
      {
        label: 'Location',
        backgroundColor: '#F8FCE3',
        borderColor: 'grey',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [65, 59, 80, 81, 56, 50, 60],
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} style={{ backgroundColor: '#F6FDCF' }} />;
};

export default HorizontalBarChart;
