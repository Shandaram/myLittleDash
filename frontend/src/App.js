import React from "react";
import Header from "./components/Header";
import WidgetBox from "./components/WidgetBox";
import CPUChart from "./components/charts/CPUChart";
import BatteryChart from "./components/charts/BatteryChart";
import MemoryChart from "./components/charts/MemoryChart";
import "./styles/index.css";
import "./styles/colors.css";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-container" aria-label="Dashboard widgets">
        <WidgetBox
          className="main-container__item"
          chart={CPUChart}
          desc="The percentage of CPU resources being used by your system."
          title="CPU Usage"
        />
        <div
          className="small-container main-container__item"
          role="group"
          aria-label="Battery and Memory widgets"
        >
          <WidgetBox
            chart={BatteryChart}
            desc="Your device’s battery percentage and charging status."
            title="Battery Status"
          />
          <WidgetBox
            chart={MemoryChart}
            desc="The amount of system memory (RAM) in use."
            title="Memory Usage"
          />
        </div>
      </main>
    </div>
  );
}

export default App;
