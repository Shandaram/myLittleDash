import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

const WidgetBox = ({ chart: Chart, title, desc }) => {
  const [dynamicTitle, setDynamicTitle] = useState(title);

  // Defines data handlers
  const dataHandlers = {
    battery: (data) => ({
      title: (
        <>
          Battery ({data.batteryLevel}%)
          {data.isCharging && (
            <FontAwesomeIcon
              icon={faBolt}
              style={{ marginLeft: "5px", color: "#ee5396" }}
            />
          )}
        </>
      ),
    }),
    cpu: (data) => ({
      title: `CPU Load: ${data.cpuLoad.toFixed(1)}%`,
    }),
    memory: (data) => ({
      title: `Memory Usage: ${(data.memoryUsed / 1073741824).toFixed(
        2
      )} / 8.00 GB`,
    }),
  };

  // Generalized data update handler
  const handleDataUpdate = (data, type) => {
    const handler = dataHandlers[type];
    if (handler) {
      setDynamicTitle(handler(data).title);
    }
  };

  return (
    <div className="widget-box" role="region" aria-labelledby="widget-title">
      <h2 id="widget-title" aria-live="polite">
        {dynamicTitle}
      </h2>
      <p>{desc}</p>
      <Chart onDataUpdate={(data) => handleDataUpdate(data, data.type)} />
    </div>
  );
};


WidgetBox.defaultProps = {
  title: "Heading",
  desc: "Description of the data.",
};

export default WidgetBox;
