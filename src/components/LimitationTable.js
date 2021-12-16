import React from "react";
import { ColorConstant } from "../value/color_constant";
export default function LimitationTable() {
  return (
    <div
      style={{
        height: 480,
        width: 240,
        display: "flex",
        backgroundColor: "white",
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
          backgroundColor: ColorConstant.mblack,
          borderRadius: "10px 10px 0px 0px",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <h3 style={{ color: "white" }}>NGƯỠNG CHO PHÉP</h3>
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <LimitationRow
          title={"Nhiệt độ"}
          limitaionValue={"20-40 "}
          color={ColorConstant.mred}
        />
        <LimitationRow
          title={"Độ ẩm"}
          limitaionValue={"50-90 %"}
          color={ColorConstant.mblue}
        />
        <LimitationRow
          title={"Độ pH"}
          limitaionValue={"6.5-7.5"}
          color={ColorConstant.mpurple}
        />
        <LimitationRow
          title={"Độ mặn"}
          limitaionValue={"20-30 \u2030"}
          color={ColorConstant.mlightgreen}
        />
      </div>
    </div>
  );
}

function LimitationRow({ title, limitaionValue, color }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <p
        style={{
          fontSize: 25,
          fontWeight: "bold",
          paddingRight: 10,
          textAlign: "start",
          color: color,
        }}
      >
        {title}:
      </p>
      {title == "Nhiệt độ" ? (
        <p style={{ fontSize: 25, fontWeight: "normal", color: color }}>
          {limitaionValue} &deg;C
        </p>
      ) : (
        <p style={{ fontSize: 25, fontWeight: "normal", color: color }}>
          {limitaionValue}
        </p>
      )}
    </div>
  );
}
