import React from "react";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

import "chartjs-plugin-zoom";
import zoomPlugin from "chartjs-plugin-zoom";
import { MockTest } from "./MockTestJSON";
import "chartjs-adapter-date-fns";
import { de } from "date-fns/locale";
import "chartjs-adapter-luxon";
import { ColorConstant } from "../value/color_constant";
Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  zoomPlugin
);
const LineChart = (props) => {
  const MockData = MockTest;
  const dataObjs = MockTest.feeds;
  const label = dataObjs.map((dataObj) => new Date(dataObj.created_at));
  const data = dataObjs.map((dataObj) => dataObj.field1);
  var timeFormat = "DD/MM/YYYY";
  return (
    <div
      style={{
        height: 420,
        width: 620,
        display: "flex",
        backgroundColor: "white",
        boxShadow: "2px 5px 10px #C7C8C9FF",
        borderRadius: "10px",
        alignItems: "start",
        justifyContent: "start",
        flexDirection: "column",
        paddingLeft: 5,
        paddingRight: 15,
      }}
    >
      <Line
        data={{
          datasets: [
            {
              label: props.label,
              data: props.dataChart,
            },
          ],
          labels: props.labelChart,
        }}
        height={380}
        width={580}
        options={{
          maintainAspectRatio: true,
          backgroundColor: props.mainColor,
          borderColor: props.mainColor,
          elements: {
            point: {
              pointStyle: "circle",
              backgroundColor: props.mainColor,
              radius: 2.5,
              borderColor: "#00000000",
              hoverRadius: 4,
            },
            line: {
              tension: 0.5, // disables bezier curves
            },
          },
          scales: {
            x: {
              grid: {
                color: "#00000050",
                tickLength: 5,
                tickWidth: 1,
                tickColor: "black",
              },

              type: "time",
              time: {
                // Luxon format string
                tooltipFormat: "TT   D",
                stepSize: 5,
                minUnit: "minute",
                unit: "minute",
                displayFormats: {
                  hour: "           T dd/MM/yyyy              ",
                },
              },
              title: {
                color: "black",
                display: true,
                text: "Time",
              },
              ticks: {
                color: "black",
                display: true,
                maxRotation: 0,
                sampleSize: 100,
                autoSkip: true,
                major: {
                  enabled: true,
                },
              },
            },
            y: {
              grid: { color: "#00000050", tickColor: "black" },
              bounds: "ticks",
              ticks: {
                color: "black",
                includeBounds: true,
                z: 10,
              },
              title: {
                color: "black",
                display: true,
                text: "Value",
              },
            },
          },
          interaction: {
            mode: "index",
            intersect: false,
            axis: "xy",
          },
          plugins: {
            legend: {
              labels: {
                color: "black",
              },
            },
            title: {
              color: "black",
              display: true,
              text: props.title,
              font: {
                size: 20,
              },
            },
            zoom: {
              limits: {
                x: { min: props.labelChart[0], max: props.labelChart[99] },
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                mode: "x",
              },
              pan: {
                enabled: true,
                mode: "x",
              },
            },
          },
        }}
      />
    </div>
  );
};
export default LineChart;
