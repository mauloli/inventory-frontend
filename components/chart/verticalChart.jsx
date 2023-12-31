'use client';
import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(...registerables);

const BarChart = (props) => {
  const data = {
    labels: props.data.map(item => item.year),
    datasets: [
      {
        label: 'Year of purhcase',
        backgroundColor: '#F8FCE3',
        borderColor: 'grey',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data:props.data.map(item => item.total_data),
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} style={{ backgroundColor: '#F6FDCF', borderRadius: '10px' }} />;
};

export default BarChart;
