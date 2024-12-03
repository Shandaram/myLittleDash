import React, { useEffect, useState, useRef } from "react";
import { useSystemData } from "../../hooks/useSystemData"; // custom hook
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const MemoryChart = ({ onDataUpdate }) => {
  const { systemData, status, error } = useSystemData();
  const [freeDiskSpace, setfreeDiskSpace] = useState([]);
  const [usedDiskSpace, setusedDiskSpace] = useState([]);
  const chartRef = useRef();

  useEffect(() => {
    if (systemData?.memory) {
      const newMemoryUsed = systemData.memory.used;
      const newFreeDiskSpace = systemData.memory.total - systemData.memory.used;

      // Updates local state if values change
      setusedDiskSpace((prev) =>
        prev !== newMemoryUsed ? newMemoryUsed : prev
      );
      setfreeDiskSpace((prev) =>
        prev !== newFreeDiskSpace ? newFreeDiskSpace : prev
      );

      // Notifies parent with the latest memory usage
      if (usedDiskSpace !== newMemoryUsed) {
        onDataUpdate({
          memoryUsed: newMemoryUsed,
          type: "memory",
        });
      }
    }
  }, [systemData, onDataUpdate, usedDiskSpace, freeDiskSpace]);

  useEffect(() => {
    if (chartRef.current?.chartInstance) {
      const chartInstance = chartRef.current.chartInstance;

      // Calculates percentage values for chart
      const totalSpace = freeDiskSpace + usedDiskSpace;
      const usedPercentage = (usedDiskSpace / totalSpace) * 100;
      const freePercentage = 100 - usedPercentage;

      // Updates the chart's data dynamically
      chartInstance.data.datasets[0].data = [usedPercentage, freePercentage];
      chartInstance.update();
    }
  }, [freeDiskSpace, usedDiskSpace]);

  if (status === "loading" && freeDiskSpace === null) {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  const chartData = {
    labels: ["Used Space", "Free Space"],
    datasets: [
      {
        label: "Disk Space Usage (%)",
        data: [usedDiskSpace, freeDiskSpace],
        backgroundColor: [
          usedDiskSpace / (usedDiskSpace + freeDiskSpace) > 0.95
            ? "rgba(238, 83, 150, 0.8)" // Magenta if used space is more than 95%
            : usedDiskSpace / (usedDiskSpace + freeDiskSpace) > 0.8
            ? "rgba(165, 110, 255, 0.8)" // Purple if used space is more than 80%
            : "rgba(69, 137, 255, 0.8)", // Blue otherwise
          "rgba(200,200,200,0.3)", // Free space remains grey
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: false,
    },
  };

  return (
    <div
      role="region"
      aria-label={`Disk space chart showing ${usedDiskSpace}% used and ${freeDiskSpace}% free`}
      style={{ height: "300px", width: "80%", margin: "0 auto" }}
    >
      <Doughnut ref={chartRef} data={chartData} options={chartOptions} />
      <table className="sr-only">
        <caption>Disk Space Data</caption>
        <thead>
          <tr>
            <th>Type</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Used Space</td>
            <td>{usedDiskSpace}%</td>
          </tr>
          <tr>
            <td>Free Space</td>
            <td>{freeDiskSpace}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MemoryChart;
