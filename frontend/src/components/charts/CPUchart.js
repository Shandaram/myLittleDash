import React, { useEffect, useState, useRef } from "react";
import { useSystemData } from "../../hooks/useSystemData"; // custom hook
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const CPUchart = ({ onDataUpdate }) => {
  const { systemData, status, error } = useSystemData();

  const [cpuLoadHistory, setCpuLoadHistory] = useState([]);
  const chartRef = useRef();

  // Function to get the CSS variable value
  const getCSSVar = (varName) => {
    const rootStyles = getComputedStyle(document.documentElement);
    return rootStyles.getPropertyValue(varName).trim();
  };

  useEffect(() => {
    if (systemData?.cpu) {
      const latestCpuLoad = systemData.cpu.currentLoad;

      setCpuLoadHistory((prev) => {
        // Avoid updating state if the latest CPU load hasn't changed
        if (prev[prev.length - 1] === latestCpuLoad) {
          return prev;
        }
        const newHistory = [...prev, latestCpuLoad];
        return newHistory.slice(-30); // Keep only the last 30 data points
      });

      // Notify parent only if the CPU load has changed
      if (!cpuLoadHistory.includes(latestCpuLoad)) {
        onDataUpdate({ cpuLoad: latestCpuLoad, type: "cpu" });
      }
    }
  }, [systemData?.cpu, onDataUpdate, cpuLoadHistory]);

  // Safely updates chart data using ref
  useEffect(() => {
    if (chartRef.current?.chartInstance) {
      const chartInstance = chartRef.current.chartInstance;
      chartInstance.data.datasets[0].data = cpuLoadHistory;

      chartInstance.update();
    }
  }, [cpuLoadHistory]);

  if (status === "loading" && cpuLoadHistory.length === 0) {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const chartData = {
    labels: Array(cpuLoadHistory.length)
      .fill("")
      .map((_, i) => `${(cpuLoadHistory.length - i - 1) * 5}s`),
    datasets: [
      {
        label: "CPU Load", 
        data: cpuLoadHistory,
        pointRadius: 0,
        borderWidth: 1,
        borderColor: getCSSVar("--primary-color"),
        fill: true,
        backgroundColor:
          cpuLoadHistory[cpuLoadHistory.length - 1] > 70
            ? "rgba(238, 83, 150, 0.3)" // Pink if CPU load is more than 70%
            : "rgba(15, 98, 254, 0.3)", // Blue otherwise
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: false,
        },
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        suggestedMin: 0,
        suggestedMax: 100,
        grid: {
          display: true, 
          color: "rgba(135, 141, 150, 0.5)", // Set grid color to light gray
          lineWidth: 0.8, 
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div
      role="region"
      aria-label="CPU Load Chart showing real-time data"
      style={{ height: "80%", width: "90%", margin: "0 auto" }}
    >
      <Line ref={chartRef} data={chartData} options={chartOptions} />
      <table className="sr-only">
        <caption>CPU Load Data</caption>
        <thead>
          <tr>
            <th>Time (s ago)</th>
            <th>CPU Load (%)</th>
          </tr>
        </thead>
        <tbody>
          {cpuLoadHistory.map((load, idx) => (
            <tr key={idx}>
              <td>{(cpuLoadHistory.length - idx - 1) * 5}</td>
              <td>{load}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CPUchart;
