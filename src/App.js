import "./App.css";
import Clock from "./components/Clock";
import SensorWidget from "./components/SensorWidget";
import { ColorConstant } from "./value/color_constant";
import thermo_icon from "./assets/thermo.png";
import moist_icon from "./assets/moist.png";
import bg from "./assets/bg.png";

import LineChart from "./components/LineChart";

import Swal from "sweetalert2";
import AlertPopup from "./components/AlertPopup";
import { Constant } from "./value/constant";
import { DateTime } from "luxon";
import React, { useEffect, useRef, useState } from "react";
import { set } from "date-fns";
import { Component } from "react";
import Switch from "react-switch";
import Title from "./components/Title";
import { MockTest } from "./components/MockTestJSON";
import axios, { Axios } from "axios";
const App = () => {
  const [time, setTime] = useState(
    DateTime.fromISO("2021-12-01T06:58:33.988648+00:00")
  );

  const [isEnabledAlert, setIsEnabledAlert] = useState(true);
  const [isEnabledUpdateAPI, setIsEnabledUpdateAPI] = useState(true);

  const [state, setState] = useState({
    temperature: 15,
    moist: 70,
    isAlertTemperature: false,
    isAlertMoist: false,
    labelChart: [],
    dataChartTemperature: [],
    dataChartMoist: [],
  });
  const intervalRef = useRef(null);
  var mockDateTimeSecond = 10;
  var tempTemperature = 10;
  var tempMoist = 80;

  function handleSwitchPopupChange(checked) {
    setIsEnabledAlert(checked);
  }
  function handleSwitchUpdateAPIChange(checked) {
    setIsEnabledUpdateAPI(checked);
  }
  function checkAlert() {
    // console.log("alert tem", state.isAlertTemperature);
    // console.log("alert moist", state.isAlertMoist);
    // console.log("Temperature: ", state.temperature);
    // console.log("Moist: ", state.moist);
    console.log("--------------");
    if (isEnabledAlert) {
      //Xét switch cho phép bật Popup
      if (state.isAlertTemperature && !state.isAlertMoist) {
        AlertPopup(
          Constant.titleTemperature,
          "Alert \n Temperature is too high or too low!"
        );
      } else if (state.isAlertMoist && !state.isAlertTemperature) {
        AlertPopup(
          Constant.titleMoist,
          "Alert \n Moist is too high or too low!"
        );
      } else if (state.isAlertMoist && state.isAlertTemperature) {
        AlertPopup(
          Constant.titleBothTemperatureMoist,
          "Alert \n Temperature and Moist is too high or too low!"
        );
      }
    }
  }
  const fetch2API = async () => {
    const temperatureAPI =
      "https://api.thingspeak.com/channels/1569887/fields/1.json";
    const moistAPI =
      "https://api.thingspeak.com/channels/1569887/fields/2.json";

    const getTemperatureAPI = axios.get(temperatureAPI);
    const getMoistAPI = axios.get(moistAPI);
    axios.all([getTemperatureAPI, getMoistAPI]).then(
      axios.spread(async (...allData) => {
        const temperatureData = allData[0].data;
        const moistData = allData[1].data;

        const dataObjs1 = temperatureData.feeds;
        var labelChart = dataObjs1.map(
          (dataObj1) => new Date(dataObj1.created_at)
        );
        var dataTemperatureChart = dataObjs1.map((dataObj1) => dataObj1.field1);

        const dataObjs2 = moistData.feeds;
        var dataMoistChart = dataObjs2.map((dataObj2) => dataObj2.field2);

        //Simulate data
        dataTemperatureChart[50] =
          parseInt(dataTemperatureChart[50]) + DateTime.now().second + 30;
        dataTemperatureChart[99] =
          parseInt(dataTemperatureChart[99]) + DateTime.now().second;

        dataMoistChart[50] =
          parseInt(dataMoistChart[50]) - DateTime.now().second - 50;
        dataMoistChart[99] =
          parseInt(dataMoistChart[99]) - DateTime.now().second;

        tempTemperature = parseInt(dataTemperatureChart.slice(-1)[0]);
        tempMoist =
          dataMoistChart.slice(-1)[0] == null
            ? 70
            : parseInt(dataMoistChart.slice(-1)[0]);
        var tempIsAlertTemperature =
          tempTemperature > Constant.temperatureHighLimit ||
          tempTemperature < Constant.temperatureLowLimit;
        var tempIsAlertMoist =
          tempMoist > Constant.moistHighLimit ||
          tempMoist < Constant.moistLowLimit;

        //Cập nhật trạng thái
        await setState({
          temperature: tempTemperature,
          moist: tempMoist,
          isAlertTemperature: tempIsAlertTemperature,
          isAlertMoist: tempIsAlertMoist,
          labelChart: labelChart,
          dataChartTemperature: dataTemperatureChart,
          dataChartMoist: dataMoistChart,
        });
      })
    );
  };
  //Lấy API
  useEffect(async () => {
    intervalRef.current = setInterval(async () => {
      mockDateTimeSecond = DateTime.now().second;
      if (isEnabledUpdateAPI) {
        fetch2API();
      }
    }, Constant.timeSamplingData);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  //set Alert
  useEffect(async () => {}, [mockDateTimeSecond]);

  useEffect(() => {
    checkAlert();
  }, [state]);
  return (
    <div className="app">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title />
        <div style={{ flexDirection: "row", display: "flex", marginTop: 20 }}>
          <div
            style={{
              width: 780,
              height: 480,
              display: "flex",
              backgroundColor: "white",
              boxShadow: "2px 5px 10px #C7C8C9FF",
              borderRadius: "10px",
              alignItems: "start",
              justifyContent: "start",
              flexDirection: "column",
            }}
          >
            <img src={bg} width="780" height="480" />
          </div>
          <div style={{ marginLeft: 20 }}>
            <Clock />
            <div
              style={{ flexDirection: "row", display: "flex", marginTop: 20 }}
            >
              <SensorWidget
                value={state.temperature}
                color={ColorConstant.mred}
                title={Constant.titleTemperature}
                isAlert={state.isAlertTemperature}
                img={thermo_icon}
                backgroundColor="white"
              />
              <div style={{ width: 20 }}></div>
              <SensorWidget
                value={state.moist}
                color={ColorConstant.mblue}
                title={Constant.titleMoist}
                isAlert={state.isAlertMoist}
                img={moist_icon}
                backgroundColor="white"
              />
            </div>
            <div
              style={{ flexDirection: "row", display: "flex", marginTop: 20 }}
            >
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
          </div>
        </div>
        <div style={{ flexDirection: "row", display: "flex", marginTop: 20 }}>
          <LineChart
            title="Temperature Chart"
            label="Temperature"
            labelChart={state.labelChart}
            dataChart={state.dataChartTemperature}
            mainColor={ColorConstant.mred}
          />
          <div style={{ width: 20 }}></div>
          <LineChart
            title="Humidity Chart"
            label="Humidity"
            labelChart={state.labelChart}
            dataChart={state.dataChartMoist}
            mainColor={ColorConstant.mblue}
          />
        </div>
        <div style={{ flexDirection: "row", display: "flex", marginTop: 20 }}>
          <LineChart
            title="Lorem 1 Chart"
            label="Lorem 1"
            labelChart={state.labelChart}
            mainColor={ColorConstant.mpurple}
          />
          <div style={{ width: 20 }}></div>
          <LineChart
            title="Lorem 2 Chart"
            label="Lorem 2"
            labelChart={state.labelChart}
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>SETTINGS</h1>
        <h3>Enable alert popup</h3>
        <Switch onChange={handleSwitchPopupChange} checked={isEnabledAlert} />
        <h3>Enable update API</h3>
        <Switch
          onChange={handleSwitchUpdateAPIChange}
          checked={isEnabledUpdateAPI}
        />
      </div>
      <div
        style={{
          height: 50,
        }}
      ></div>
    </div>
  );
};
export default App;
