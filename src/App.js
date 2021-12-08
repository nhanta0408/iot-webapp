import "./App.css";
import Clock from "./components/Clock";
import SensorWidget from "./components/SensorWidget";
import { ColorConstant } from "./value/color_constant";
import thermo_icon from "./assets/thermo.png";
import moist_icon from "./assets/moist.png";
import LineChart from "./components/LineChart";

import Swal from "sweetalert2";
import AlertPopup from "./components/AlertPopup";
import { Constant } from "./value/constant";
import { DateTime } from "luxon";
import React, { useEffect, useRef, useState } from "react";
import { set } from "date-fns";
import { Component } from "react";
import Switch from "react-switch";

// const App = () => {
//   const [time, setTime] = useState(
//     DateTime.fromISO("2021-12-01T06:58:33.988648+00:00")
//   );
//   const [temperature, setTemperature] = useState(15);
//   const [moist, setMoist] = useState(70);
//   const [temperature2, setTemperature2] = useState(15);
//   const [moist2, setMoist2] = useState(70);
//   const [isAlertTemperature, setIsAlertTemperature] = useState(false);
//   const [isAlertMoist, setIsAlertMoist] = useState(false);
//   const [isEnabledAlert, setIsEnableAlert] = useState(true);
//   const intervalRef = useRef(null);
//   var temp = 10;
//   function checkAlert() {
//     console.log("alert tem", isAlertTemperature);
//     console.log("alert moist", isAlertMoist);
//     console.log("Temperature: ", temperature);
//     console.log("Moist: ", moist);
//     console.log("Temperature 2: ", temperature2);
//     console.log("Moist 2: ", moist2);
//     console.log("--------------");

//     // if (isAlertTemperature && !isAlertMoist) {
//     //   AlertPopup(
//     //     Constant.titleTemperature,
//     //     "Alert \n Temperature is too high or too low!"
//     //   );
//     // } else if (isAlertMoist && !isAlertTemperature) {
//     //   AlertPopup(
//     //     Constant.titleTemperature,
//     //     "Alert \n Moist is too high or too low!"
//     //   );
//     // } else if (isAlertMoist && isAlertTemperature) {
//     //   AlertPopup(
//     //     Constant.titleBothTemperatureMoist,
//     //     "Alert \n Temperature and Moist is too high or too low!"
//     //   );
//     // }
//   }
//   const getTimeAPI = async () => {
//     fetch("http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh")
//       .then(function (response) {
//         if (response.status === 200) {
//           response.json().then(function (data) {
//             setTime(DateTime.fromISO(data.utc_datetime));
//             //console.log("Time API ", time.toFormat("ss"));
//           });
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   const setTemperatureFunc = async () => {
//     await setTemperature(DateTime.now().second);
//   };

//   useEffect(() => {
//     intervalRef.current = setInterval(async () => {
//       await setTemperatureFunc();
//       console.log("Temperature", temperature);
//     }, 4000);
//     return () => {
//       clearInterval(intervalRef.current);
//     };
//   }, [temperature]);

//   return (
//     <div className="app">
//       <div>
//         <div style={{ display: "flex", marginTop: 20 }}>
//           <Clock time={time} />
//           <div style={{ width: 20 }}></div>
//           <SensorWidget
//             value={temperature}
//             color={ColorConstant.mred}
//             title={Constant.titleTemperature}
//             isAlert={isAlertTemperature}
//             img={thermo_icon}
//             backgroundColor="white"
//           />
//           <div style={{ width: 20 }}></div>
//           <SensorWidget
//             value={moist}
//             color={ColorConstant.mblue}
//             title={Constant.titleMoist}
//             isAlert={isAlertMoist}
//             img={moist_icon}
//             backgroundColor="white"
//           />
//           <div style={{ width: 20 }}></div>
//           <SensorWidget
//             value={75}
//             color={ColorConstant.mpurple}
//             title="LOREM 1"
//             img={moist_icon}
//             backgroundColor="white"
//           />
//           <div style={{ width: 20 }}></div>
//           <SensorWidget
//             value={75}
//             color={ColorConstant.mlightgreen}
//             title="LOREM 2"
//             img={moist_icon}
//             backgroundColor="white"
//           />
//         </div>
//         <div style={{ flexDirection: "row", display: "flex", marginTop: 20 }}>
//           <LineChart
//             title="Temperature Chart"
//             label="Temperature"
//             mainColor={ColorConstant.mred}
//           />
//           <div style={{ width: 20 }}></div>
//           <LineChart
//             title="Humidity Chart"
//             label="Humidity"
//             mainColor={ColorConstant.mblue}
//           />
//         </div>
//         <div style={{ flexDirection: "row", display: "flex", marginTop: 20 }}>
//           <LineChart
//             title="Lorem 1 Chart"
//             label="Lorem 1"
//             mainColor={ColorConstant.mpurple}
//           />
//           <div style={{ width: 20 }}></div>
//           <LineChart
//             title="Lorem 2 Chart"
//             label="Lorem 2"
//             mainColor={ColorConstant.mlightgreen}
//           />
//         </div>
//       </div>
//       <div
//         style={{
//           height: 50,
//           alignItems: "end",
//           justifyContent: "end",
//           backgroundColor: "red",
//         }}
//       ></div>
//     </div>
//   );
// };
// export default App;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: 15,
      moist: 70,
      alertTemperature: false,
      alertMoist: false,
      time: DateTime.fromISO("2021-12-01T06:58:33.988648+00:00"),
      enabledAlertPopUp: false,
    };
  }
  getTimeAPI = async () => {
    fetch("http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh")
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            this.setState({
              ...this.state,
              time: DateTime.fromISO(data.utc_datetime),
            });
            //console.log("Time API ", time.toFormat("ss"));
          });
        }
      })
      .catch((err) => console.log(err));
  };
  loadData = async () => {
    try {
      await this.setState({
        ...this.state,
        temperature: DateTime.now().second,
        moist: DateTime.now().second + 40,
      });
      console.log("Temperature: ", this.state.temperature);
      console.log("Moist: ", this.state.moist);
      await this.setState({
        ...this.state,
        alertTemperature:
          this.state.temperature > Constant.temperatureHighLimit ||
          this.state.temperature < Constant.temperatureLowLimit,
        alertMoist:
          this.state.moist > Constant.moistHighLimit ||
          this.state.moist < Constant.moistLowLimit,
      });
      console.log("Alert Temperature: ", this.state.alertTemperature);
      console.log("Alert Moist: ", this.state.alertMoist);
      console.log("--------------");
      if (this.state.enabledAlertPopUp) {
        if (this.state.alertTemperature && !this.state.alertMoist) {
          AlertPopup(
            Constant.titleTemperature,
            "Alert \n Temperature is too high or too low!"
          );
        } else if (this.state.alertMoist && !this.state.alertTemperature) {
          AlertPopup(
            Constant.titleMoist,
            "Alert \n Moist is too high or too low!"
          );
        } else if (this.state.alertMoist && this.state.alertTemperature) {
          AlertPopup(
            Constant.titleBothTemperatureMoist,
            "Alert \n Temperature and Moist is too high or too low!"
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleSwitchChange = (checked) => {
    this.setState({ ...this.state, enabledAlertPopUp: checked });
  };
  componentDidMount() {
    setInterval(() => {
      this.loadData();
    }, Constant.timeSamplingData);
    setInterval(() => {
      this.getTimeAPI();
    }, 10000);
  }
  render() {
    return (
      <div className="app">
        <div>
          <div style={{ display: "flex", marginTop: 20 }}>
            <Clock time={this.state.time} />
            <div style={{ width: 20 }}></div>
            <SensorWidget
              value={this.state.temperature}
              color={ColorConstant.mred}
              title={Constant.titleTemperature}
              isAlert={false}
              img={thermo_icon}
              isAlert={this.state.alertTemperature}
              backgroundColor="white"
            />
            <div style={{ width: 20 }}></div>
            <SensorWidget
              value={this.state.moist}
              color={ColorConstant.mblue}
              title={Constant.titleMoist}
              isAlert={false}
              img={moist_icon}
              isAlert={this.state.alertMoist}
              backgroundColor="white"
            />
            <div style={{ width: 20 }}></div>
            <SensorWidget
              value={75}
              color={ColorConstant.mpurple}
              title="LOREM 1"
              img={moist_icon}
              backgroundColor="white"
            />
            <div style={{ width: 20 }}></div>
            <SensorWidget
              value={75}
              color={ColorConstant.mlightgreen}
              title="LOREM 2"
              img={moist_icon}
              backgroundColor="white"
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
        <div
          style={{
            flex: 1,
            flexDirection: "row",
            alignContent: "center",
            justifyItems: "center",
            backgroundColor: "red",
          }}
        >
          <h1>SETTINGS</h1>
          <h3>Enable alert popup</h3>
          <Switch
            style={{ width: 100, backgroundColor: "blue" }}
            onChange={this.handleSwitchChange}
            checked={this.state.enabledAlertPopUp}
          />
        </div>
      </div>
    );
  }
}
export default App;
