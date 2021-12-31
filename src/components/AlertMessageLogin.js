import React from "react";
import Alert from "react-bootstrap/Alert";
const AlertMessageLogin = ({ info }) => {
  return info === null ? null : (
    <Alert style={{ color: "red" }}>{info.message}</Alert>
  );
};

export default AlertMessageLogin;
