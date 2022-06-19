import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ labels, rates, minRate, maxRate }) => {
  const options = {
    scales: {
      x: {
        display: false,
      },
      y: {
        // suggestedMin: minRate - 2,
        // suggestedMax: maxRate + 2,
        ticks: {
          stepSize: 10,
        },
      },
    },
    responsive: true,
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const data = {
    labels: labels.splice(-50),
    datasets: [
      {
        backgroundColor: 'rgba(255, 99, 132, 0)',
        borderColor: 'rgb(200, 200, 200)',
        data: rates.splice(-50),
        tension: 0.4,
        pointRadius: 1,
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default Chart;
