import React, { useEffect, useState } from "react";
import { useSystemData } from "../../hooks/useSystemData"; // custom hook

const BatteryChart = ({ onDataUpdate }) => {
  const { systemData, status, error } = useSystemData();

  const [batteryLevel, setBatteryLevel] = useState(null);
  const [isCharging, setIsCharging] = useState(null);

  useEffect(() => {
    if (systemData?.battery) {
      const newBatteryLevel = systemData.battery.percent;
      const newIsCharging = systemData.battery.isCharging;

      // Updates local state if values change
      setBatteryLevel((prev) =>
        prev !== newBatteryLevel ? newBatteryLevel : prev
      );
      setIsCharging((prev) => (prev !== newIsCharging ? newIsCharging : prev));

      // Notifies parent about the updates only if values change
      if (batteryLevel !== newBatteryLevel || isCharging !== newIsCharging) {
        onDataUpdate({
          batteryLevel: newBatteryLevel,
          isCharging: newIsCharging,
          type: "battery",
        });
      }
    }
  }, [systemData, onDataUpdate, batteryLevel, isCharging]);

  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div
      role="progressbar"
      aria-label={`Battery level is ${batteryLevel}%`}
      aria-valuenow={batteryLevel}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ width: "100%", margin: "0 auto", textAlign: "center" }}
    >
      <div
        style={{
          width: "100%",
          height: "30px",
          backgroundColor: "rgba(77, 83, 88, 0.4)",
          borderRadius: "5px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          className={
            isCharging ? "chart__progress-bar--charging" : "chart__progress-bar"
          }
          style={{
            width: `${batteryLevel ?? 0}%`,
            backgroundColor: batteryLevel < 20 ? "#ee5396" : "#4589ff",
          }}
        >
          <span className="sr-only">{`${batteryLevel}% ${
            isCharging ? "and charging" : ""
          }`}</span>
        </div>
      </div>
    </div>
  );
};

export default BatteryChart;
