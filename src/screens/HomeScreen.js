import "../App.css";
import Clock from "../components/Clock";
import SensorWidget from "../components/SensorWidget";
import { ColorConstant } from "../value/color_constant";
import thermo_icon from "../assets/thermo.png";
import dissolveOxy_icon from "../assets/moist.png";
import pH_icon from "../assets/pH.png";
import salitiny_icon from "../assets/salitiny.png";
import bg_1 from "../assets/bg-1.png";
import bg_1_1 from "../assets/bg-1-1.png";
import bg_1_2 from "../assets/bg-1-2.png";
import bg_1_3 from "../assets/bg-1-3.png";

import LineChart from "../components/LineChart";

import AlertPopup from "../components/AlertPopup";
import { Constant } from "../value/constant";
import { DateTime } from "luxon";
import React, { useEffect, useRef, useState } from "react";
import Switch from "react-switch";
import Title from "../components/Title";
import { MockTest } from "../components/MockTestJSON";
import { MockTestPH } from "../components/MockTestJsonPH";
import { MockTestDissolveOxy } from "../components/MockTestJsonDissolveOxy";

import axios, { Axios } from "axios";
import LimitationTable from "../components/LimitationTable";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import DropdownBar from "../components/DropdownBar";
import Select from "react-select";
import { checkAlert } from "../util/checkAlert";
const HomeScreen = () => {
  const [time, setTime] = useState(
    DateTime.fromISO("2021-12-01T06:58:33.988648+00:00")
  );

  const [isEnabledAlert, setIsEnabledAlert] = useState(true);
  const [isMute, setIsMute] = useState(true);

  const [pondSelected, setPondSelected] = useState({ value: 1 });
  const [selectedOption, setSelectedOption] = useState({
    value: "Ao số 1",
    label: "Ao số 1",
    color: "red",
  });
  const [iotDataFromAPI, setIotDataFromAPI] = useState({
    temperature: 15,
    dissolveOxy: 70,
    pH: 7.5,
    salinity: 25,
    isAlertTemperature: 0,
    isAlertDissolveOxy: 0,
    isAlertpH: 0,
    isAlertSalinity: 0,
    labelChart: [],
    dataChartTemperature: [],
    dataChartDissolveOxy: [],
    dataChartPH: [],
    dataChartSalinity: [],
  });
  const [iotDataRender, setIotDataRender] = useState({
    temperature: 15,
    dissolveOxy: 70,
    pH: 7.5,
    salinity: 25,
    isAlertTemperature: 0,
    isAlertDissolveOxy: 0,
    isAlertpH: 0,
    isAlertSalinity: 0,
    labelChart: [],
    dataChartTemperature: [],
    dataChartDissolveOxy: [],
    dataChartPH: [],
    dataChartSalinity: [],
  });
  const intervalRef = useRef(null);
  var mockDateTimeSecond = 10;

  //const options = ["Ao nuôi số 1", "Ao nuôi số 2"];
  const options = [
    { value: "Ao số 1", label: "Ao số 1", color: "red" },
    { value: "Ao số 2", label: "Ao số 2", color: "red" },
    { value: "Ao số 3", label: "Ao số 3", color: "red" },
  ];
  function handleSwitchPopupChange(checked) {
    setIsEnabledAlert(checked);
  }

  function handleSwitchMute(checked) {
    setIsMute(checked);
  }
  function handleDropdownChange(option) {
    console.log("Option: ", option);
    const pondIndex = parseInt(option.value.substring(11, 12)) - 1;
    console.log(`Pond Index: ${pondIndex}`);
    setPondSelected({ value: pondIndex });
  }

  function showAlert() {
    console.log("--------------");
    var isHasAleastLevel2 =
      iotDataRender.isAlertTemperature == 2 ||
      iotDataRender.isAlertDissolveOxy == 2 ||
      iotDataRender.isAlertpH == 2 ||
      iotDataRender.isAlertSalinity == 2;
    var isHasAleastLevel1 =
      iotDataRender.isAlertTemperature == 1 ||
      iotDataRender.isAlertDissolveOxy == 1 ||
      iotDataRender.isAlertpH == 1 ||
      iotDataRender.isAlertSalinity == 1;
    if (isEnabledAlert) {
      //Xét switch cho phép bật Popup
      //Nếu có ít nhất 1 cái level2 và KHÔNG có cái level1 nào
      if (isHasAleastLevel2 && !isHasAleastLevel1) {
        AlertPopup(
          Constant.redWarning,
          "Cảnh báo \n Có giá trị vượt ngưỡng",
          isMute
        );
      }
      //Nếu có ít nhất 1 cái level1 và KHÔNG có cái level2 nào
      else if (isHasAleastLevel1 && !isHasAleastLevel2) {
        AlertPopup(
          Constant.yellowWarning,
          "Cảnh báo \n Có giá trị sắp vượt ngưỡng",
          isMute
        );
      } else if (isHasAleastLevel1 && isHasAleastLevel2) {
        AlertPopup(
          Constant.yellowWarning,
          "Cảnh báo \n Có giá trị đã vượt ngưỡng \n Có giá trị sắp vượt ngưỡng",
          isMute
        );
      }
    }
  }
  const fetch2API = async () => {
    const temperatureAPI =
      "https://api.thingspeak.com/channels/1569887/fields/1.json";
    const salinityAPI =
      "https://api.thingspeak.com/channels/1569887/fields/2.json";

    const getTemperatureAPI = axios.get(temperatureAPI);
    const getSalinityAPI = axios.get(salinityAPI);
    axios.all([getTemperatureAPI, getSalinityAPI]).then(
      axios.spread(async (...allData) => {
        const temperatureData = allData[0].data;
        const salinityData = allData[1].data;

        const dataObjs1 = temperatureData.feeds;
        var labelChart = dataObjs1.map(
          (dataObj1) => new Date(dataObj1.created_at)
        );
        var dataTemperatureChart = dataObjs1.map((dataObj1) => dataObj1.field1);

        const dataObjs2 = salinityData.feeds;
        var dataSalinityChart = dataObjs2.map((dataObj2) => dataObj2.field2);
        //Simulate data
        dataTemperatureChart[50] =
          parseInt(dataTemperatureChart[50]) + (DateTime.now().second + 30) / 6;
        dataTemperatureChart[99] =
          parseInt(dataTemperatureChart[99]) + DateTime.now().second / 6;
        dataSalinityChart[50] = parseInt(dataSalinityChart[50]);
        dataSalinityChart[99] = parseInt(
          dataSalinityChart[99] - DateTime.now().second / 30
        );
        //Hết Simulate

        //Lấy phần tử cuối cùng
        var tempTemperature = parseFloat(
          dataTemperatureChart.slice(-1)[0]
        ).toFixed(1);
        var tempSalinity =
          dataSalinityChart.slice(-1)[0] == null
            ? 22
            : dataSalinityChart.slice(-1)[0];

        //Mock data PH và Dissolve Oxy
        const MockDataPH = MockTestPH;
        const dataObjsPH = MockTestPH.feeds;
        var datapHChart = dataObjsPH.map((dataObj) => dataObj.field1);

        const MockDataDissolveOxy = MockTestDissolveOxy;
        const dataObjsDissolveOxy = MockTestDissolveOxy.feeds;
        var dataDissolveOxyChart = dataObjsDissolveOxy.map(
          (dataObj) => dataObj.field1
        );
        var tempDissolveOxy = parseInt(dataDissolveOxyChart.slice(-1)[0]);
        var temppH = parseFloat(datapHChart.slice(-1)[0]).toFixed(1);

        var tempIsAlertTemperature = 1;
        var tempIsAlertDissolveOxy = 1;
        var tempIsAlertSalinity = 1;
        var tempIsAlertpH = 1;

        var resultCheck = checkAlert(
          tempTemperature,
          tempDissolveOxy,
          temppH,
          tempSalinity
        );
        //Cập nhật trạng thái
        await setIotDataFromAPI({
          temperature: tempTemperature,
          dissolveOxy: tempDissolveOxy,
          pH: temppH,
          salinity: tempSalinity,
          isAlertTemperature: resultCheck.isTemperatureAlert,
          isAlertDissolveOxy: resultCheck.isDissolveOxyAlert,
          isAlertpH: resultCheck.ispHAlert,
          isAlertSalinity: resultCheck.isSalinityAlert,
          labelChart: labelChart,
          dataChartTemperature: dataTemperatureChart,
          dataChartDissolveOxy: dataDissolveOxyChart,
          dataChartPH: datapHChart,
          dataChartSalinity: dataSalinityChart,
        });
      })
    );
  };
  useEffect(async () => {
    fetch2API();
    console.log("In duy nhất 1 lần khi refresh");
  }, []);

  //Lấy API periodically
  useEffect(async () => {
    intervalRef.current = setInterval(async () => {
      mockDateTimeSecond = DateTime.now().second;
      await fetch2API();
      console.log("Dang fetchApi");
    }, Constant.timeSamplingData);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  //Đưa ra render
  useEffect(() => {
    console.log(`selectedOption`, selectedOption);
    if (selectedOption.value === "Ao số 1") {
      setIotDataRender(iotDataFromAPI);
      console.log(iotDataRender);
    } else {
      //MockData
      const MockDataTemperature = MockTest;
      const dataObjs1 = MockDataTemperature.feeds;
      var labelChart = dataObjs1.map(
        (dataObj1) => new Date(dataObj1.created_at)
      );
      var dataTemperatureChart = dataObjs1.map((dataObj1) => dataObj1.field1);

      var dataSalinityChart = dataObjs1.map((dataObj1) => {
        return (parseInt(dataObj1.field1) / 8).toString();
      });

      //Mock data PH và Salitiny
      const MockDataPH = MockTestPH;
      const dataObjsPH = MockTestPH.feeds;
      var datapHChart = dataObjsPH.map((dataObj) => dataObj.field1);

      const MockDataDissolveOxy = MockTestDissolveOxy;
      const dataObjsDissolveOxy = MockTestDissolveOxy.feeds;
      var dataDissolveOxyChart = dataObjsDissolveOxy.map(
        (dataObj) => dataObj.field1
      );

      //Chinh value gia
      dataTemperatureChart[99] = 39;
      dataDissolveOxyChart[99] = 5;
      datapHChart[99] = 7.25;
      dataSalinityChart[99] = 29;

      var tempTemperature = parseFloat(
        dataTemperatureChart.slice(-1)[0]
      ).toFixed(1);
      var tempDissolveOxy =
        dataDissolveOxyChart.slice(-1)[0] == null
          ? 3.75
          : parseFloat(dataDissolveOxyChart.slice(-1)[0]).toFixed(1);
      var temppH = parseFloat(datapHChart.slice(-1)[0]).toFixed(1);
      var tempSalinity = parseInt(dataSalinityChart.slice(-1)[0]);

      var tempIsAlertTemperature = 1;
      var tempIsAlertDissolveOxy = 1;
      var tempIsAlertSalinity = 1;
      var tempIsAlertpH = 1;
      console.log("temp pH", temppH);
      var resultCheck = checkAlert(
        tempTemperature,
        tempDissolveOxy,
        temppH,
        tempSalinity
      );
      console.log(resultCheck);
      setIotDataRender({
        temperature: tempTemperature,
        dissolveOxy: tempDissolveOxy,
        pH: temppH,
        salinity: tempSalinity,
        isAlertTemperature: resultCheck.isTemperatureAlert,
        isAlertDissolveOxy: resultCheck.isDissolveOxyAlert,
        isAlertpH: resultCheck.ispHAlert,
        isAlertSalinity: resultCheck.isSalinityAlert,
        labelChart: labelChart,
        dataChartTemperature: dataTemperatureChart,
        dataChartDissolveOxy: dataDissolveOxyChart,
        dataChartPH: datapHChart,
        dataChartSalinity: dataSalinityChart,
      });
    }
  }, [selectedOption, iotDataFromAPI]);

  //set Alert
  useEffect(() => {
    showAlert();
  }, [iotDataRender]);

  return (
    <div
      className="app"
      style={{
        width: "100%",
        backgroundColor: "#E7E8E9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title />
        {/* <Dropdown
          style={{ backgroundColor: "yellow" }}
          options={options}
          onChange={handleDropdownChange}
          value={options[pondSelected.value]}
          placeholder="Select an option"
          backgroundColor="red"
        /> */}
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />

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
            <img
              src={
                selectedOption.value === "Ao số 1"
                  ? bg_1_1
                  : selectedOption.value === "Ao số 2"
                  ? bg_1_2
                  : bg_1_3
              }
              width="780"
              height="480"
            />
          </div>
          <div style={{ marginLeft: 20 }}>
            <Clock />
            <div
              style={{ flexDirection: "row", display: "flex", marginTop: 20 }}
            >
              <SensorWidget
                value={iotDataRender.temperature}
                color={ColorConstant.mred}
                title={Constant.titleTemperature}
                isAlert={iotDataRender.isAlertTemperature}
                img={thermo_icon}
                backgroundColor="white"
              />
              <div style={{ width: 20 }}></div>
              <SensorWidget
                value={iotDataRender.dissolveOxy}
                color={ColorConstant.mblue}
                title={Constant.titleDissolveOxy}
                isAlert={iotDataRender.isAlertDissolveOxy}
                img={dissolveOxy_icon}
                backgroundColor="white"
              />
            </div>
            <div
              style={{ flexDirection: "row", display: "flex", marginTop: 20 }}
            >
              <SensorWidget
                value={iotDataRender.pH}
                color={ColorConstant.mpurple}
                title={Constant.titlepH}
                isAlert={iotDataRender.isAlertpH}
                img={pH_icon}
                backgroundColor="white"
              />
              <div style={{ width: 20 }}></div>
              <SensorWidget
                value={iotDataRender.salinity}
                color={ColorConstant.mlightgreen}
                title={Constant.titleSalinity}
                isAlert={iotDataRender.isAlertSalinity}
                img={salitiny_icon}
                backgroundColor="white"
              />
            </div>
          </div>
          <div style={{ width: 20 }}></div>
          <LimitationTable />
        </div>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            marginTop: 20,
            marginLeft: 20,
          }}
        >
          <LineChart
            title="Đồ thị Nhiệt độ"
            label="Nhiệt độ"
            labelChart={iotDataRender.labelChart}
            dataChart={iotDataRender.dataChartTemperature}
            mainColor={ColorConstant.mred}
          />
          <div style={{ width: 20 }}></div>
          <LineChart
            title="Đồ thị Độ oxy hòa tan"
            label="Độ oxy hòa tan"
            labelChart={iotDataRender.labelChart}
            dataChart={iotDataRender.dataChartDissolveOxy}
            mainColor={ColorConstant.mblue}
          />
        </div>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            marginTop: 20,
            marginLeft: 20,
          }}
        >
          <LineChart
            title="Đồ thị độ pH"
            label="Độ pH"
            labelChart={iotDataRender.labelChart}
            dataChart={iotDataRender.dataChartPH}
            mainColor={ColorConstant.mpurple}
          />
          <div style={{ width: 20 }}></div>
          <LineChart
            title="Đồ thị độ mặn"
            label="Độ mặn"
            labelChart={iotDataRender.labelChart}
            dataChart={iotDataRender.dataChartSalinity}
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
        <h1>CÀI ĐẶT</h1>
        <h3>Cho phép hiển thị cửa sổ cảnh báo</h3>
        <Switch onChange={handleSwitchPopupChange} checked={isEnabledAlert} />
        <h3>Tắt âm thanh cảnh báo</h3>
        <Switch onChange={handleSwitchMute} checked={isMute} />
      </div>
      <div
        style={{
          height: 50,
        }}
      ></div>
      ;
    </div>
  );
};
export default HomeScreen;

const customStyles = {
  control: () => ({
    width: 200,
    fontSize: 30,
  }),
};
