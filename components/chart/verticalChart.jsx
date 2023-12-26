'use client';
import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import * as R from 'ramda';
Chart.register(...registerables);

const currentDate = new Date();

// Mendapatkan tahun saat ini
const currentYear = currentDate.getFullYear();

// Mendapatkan 8 tahun terakhir dari tahun ini menggunakan Ramda
const getLastEightYears = R.pipe(
  R.range(0),
  R.map(offset => currentYear - offset),
);

// Menggunakan fungsi getLastEightYears
const lastEightYears = getLastEightYears(7).sort((a, b) => a - b);// Menggunakan 7 karena kita ingin tahun ini juga


const BarChart = () => {
  const data = {
    labels: lastEightYears,
    datasets: [
      {
        label: 'Year of purhcase',
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
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} style={{backgroundColor:'#F6FDCF',borderRadius:'10px'}}/>;
};

export default BarChart;
