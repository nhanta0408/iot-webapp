import "./App.css";
import Clock from "./components/Clock";
import SensorWidget from "./components/SensorWidget";
import { ColorConstant } from "./value/color_constant";
import thermo_icon from "./assets/thermo.png";
import humidity_icon from "./assets/humidity.png";
import LineChart from "./components/LineChart";

function App() {
  return (
    <div className="app">
      <div>
        <div style={{ display: "flex", marginTop: 20 }}>
          <Clock />
          <div style={{ width: 20 }}></div>
          <SensorWidget
            value={37}
            color={ColorConstant.mred}
            title="TEMPERATURE"
            img={thermo_icon}
            backgroundColor={ColorConstant.mblue}
          />
          <div style={{ width: 20 }}></div>
          <SensorWidget
            value={"75 %"}
            color={ColorConstant.mblue}
            title="HUMIDITY"
            img={humidity_icon}
          />
          <div style={{ width: 20 }}></div>
          <SensorWidget
            value={75}
            color={ColorConstant.mpurple}
            title="LOREM 1"
            img={humidity_icon}
          />
          <div style={{ width: 20 }}></div>
          <SensorWidget
            value={75}
            color={ColorConstant.mlightgreen}
            title="LOREM 2"
            img={humidity_icon}
          />
        </div>
        <div style={{ flexDirection: "row", display: "flex", marginTop: 20 }}>
          <LineChart
            title="Temperature Chart"
            label="Temperature"
            mainColor={ColorConstant.mred}
          />
          <div style={{ width: 20 }}></div>
          <LineChart
            title="Humidity Chart"
            label="Humidity"
            mainColor={ColorConstant.mblue}
          />
        </div>
        <div style={{ flexDirection: "row", display: "flex", marginTop: 20 }}>
          <LineChart
            title="Lorem 1 Chart"
            label="Lorem 1"
            mainColor={ColorConstant.mpurple}
          />
          <div style={{ width: 20 }}></div>
          <LineChart
            title="Lorem 2 Chart"
            label="Lorem 2"
            mainColor={ColorConstant.mlightgreen}
          />
        </div>
      </div>
      <div
        style={{
          height: 50,
          alignItems: "end",
          justifyContent: "end",
          backgroundColor: "red",
        }}
      ></div>
    </div>
  );
}
export default App;
