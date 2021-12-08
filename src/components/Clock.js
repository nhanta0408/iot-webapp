import React from "react";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { parseWithOptions } from "date-fns/fp";
export default function Clock(props) {
  return (
    <div
      style={{
        height: 160,
        width: 260,
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
          width: 260,
          backgroundColor: "#3A3A3A",
          borderRadius: "10px 10px 0px 0px",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <h2 style={{ color: "white" }}>CLOCK</h2>
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <p
          style={{
            margin: "10px 0px 0px 0px",
            fontSize: 36,
          }}
        >
          {props.time.toFormat("HH:mm:ss")}
        </p>
        <p style={{ margin: "0px 0px 0px 0px", fontSize: 20 }}>
          {props.time.toFormat("EEEE     dd/MM/yyyy")}
        </p>
      </div>
    </div>
  );
}
