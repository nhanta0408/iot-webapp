import React from "react";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { parseWithOptions } from "date-fns/fp";
export default function Clock(props) {
  const [time, setTime] = useState(
    DateTime.fromISO("2021-12-01T06:58:33.988648+00:00")
  );
  useEffect(() => {
    const id = setInterval(async () => {
      await getTimeAPI();
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [time]);
  const getTimeAPI = async () => {
    fetch("http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh")
      .then((response) => {
        if (response.status === 200) {
          response.json().then(async (data) => {
            await setTime(DateTime.fromISO(data.utc_datetime));
          });
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {});
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
          {time.toFormat("HH:mm:ss")}
        </p>
        <p style={{ margin: "0px 0px 0px 0px", fontSize: 20 }}>
          {time.toFormat("EEEE     dd/MM/yyyy")}
        </p>
      </div>
    </div>
  );
}
