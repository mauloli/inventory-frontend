'use client';
import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(...registerables);

const HorizontalBarChart = (props) => {
  const { data } = props;

  const newData = {
    labels: data.map(item => item.lokasi),
    datasets: [
      {
        label: 'Location',
        backgroundColor: '#F8FCE3',
        borderColor: 'grey',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: data.map(item => item.total_data),
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

  return <Bar data={newData} options={options} style={{ backgroundColor: '#F6FDCF' }} />;
};

export default HorizontalBarChart;
