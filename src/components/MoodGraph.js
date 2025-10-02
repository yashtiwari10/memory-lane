import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ Register Chart.js components to avoid "category is not a registered scale"
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MoodGraph = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Mood Score",
        data: [3, 4, 2, 5, 4, 3, 5],
        backgroundColor: "rgba(75,192,192,0.6)",
        borderRadius: 8, // smooth bars
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333", // text color
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: "Mood Tracking (Weekly)",
        font: { size: 20 },
      },
    },
    scales: {
      x: {
        ticks: { color: "#444" },
      },
      y: {
        ticks: { color: "#444" },
      },
    },
  };

  return (
    <div style={{ width: "700px", margin: "50px auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MoodGraph;
