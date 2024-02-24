'use client';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);

function CircleChart(props) {
  const { backgroundColor, dataChart, totalData } = props;
  const presentage = dataChart.length > 1 ? 100 : (dataChart[0] / totalData) * 100
  // console.log(presentage)
  const data = {
    // labels: ['Label 1', 'Label 2', 'Label 3'],
    datasets: [
      {
        data: dataChart,
        backgroundColor,
        hoverBackgroundColor: backgroundColor,
      },
    ],
  };

  const options = {
    responsive: true,
    // maintainAspectRatio: true,
  };

  const textCenter = {
    id: 'textCenter',
    beforeDatasetsDraw(chart) {
      const { ctx } = chart;
      ctx.save();
      ctx.font = 'bolder 15px san-serif';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${presentage}%`, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
    }
  };

  return (
    <Doughnut
      data={data}
      options={options}
      plugins={[textCenter]}
    />
  );
}

export default CircleChart;