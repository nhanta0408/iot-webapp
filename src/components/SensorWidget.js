import React from "react";
import { Constant } from "../value/constant";
import { ColorConstant } from "../value/color_constant";
export default function SensorWidget(props) {
  return (
    <div
      style={{
        height: 160,
        width: 240,
        display: "flex",
        backgroundColor: props.backgroundColor,
        boxShadow: "2px 5px 10px #C7C8C9FF",
        borderRadius: "10px",
        alignItems: "start",
        justifyContent: "start",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 50,
          width: 240,
          backgroundColor: props.color,
          borderRadius: "10px 10px 0px 0px",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <h2 style={{ color: "white" }}>{props.title}</h2>
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "start",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <img src={props.img} width="75" height="75" />
        {props.title == Constant.titleTemperature ? (
          <p
            style={{
              margin: "0px 0px 5px 10px",
              fontSize: 45,
              color:
                props.isAlert == 2
                  ? "red"
                  : props.isAlert == 1
                  ? ColorConstant.yellow
                  : "black",
            }}
          >
            {props.value}&deg;C
          </p>
        ) : props.title == Constant.titleDissolveOxy ? (
          <p
            style={{
              margin: "0px 0px 5px 0px",
              fontSize: 40,
              color:
                props.isAlert == 2
                  ? "red"
                  : props.isAlert == 1
                  ? ColorConstant.yellow
                  : "black",
            }}
          >
            {props.value + "mg/l"}
          </p>
        ) : props.title == Constant.titlepH ? (
          <p
            style={{
              margin: "0px 0px 5px 20px",
              fontSize: 45,
              color:
                props.isAlert == 2
                  ? "red"
                  : props.isAlert == 1
                  ? ColorConstant.yellow
                  : "black",
            }}
          >
            {props.value}
          </p>
        ) : (
          <p
            style={{
              margin: "0px 0px 5px 0px",
              fontSize: 45,
              color:
                props.isAlert == 2
                  ? "red"
                  : props.isAlert == 1
                  ? ColorConstant.yellow
                  : "black",
            }}
          >
            {props.value} &#8240;
          </p>
        )}
      </div>
    </div>
  );
}
