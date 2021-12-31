import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AlertMessageLogin from "../components/AlertMessageLogin";
import Title from "../components/Title";
import { ColorConstant } from "../value/color_constant";
import { Constant } from "../value/constant";

function LoginScreen() {
  const [alert, setAlert] = useState(null);

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const { username, password } = loginForm;

  const onChangeLoginForm = (event) => {
    setAlert(null);
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };
  const login = async (event) => {
    event.preventDefault();
    console.log(`Login Click with ${username} và ${password}`);
  };
  return (
    <div
      style={{
        flex: 1,
        height: 700,
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Title></Title>
      <div
        style={{
          marginTop: 30,
          marginBottom: 30,
          paddingBottom: 30,
          height: 400,
          width: 1100,
          display: "flex",
          backgroundColor: "white",
          boxShadow: "2px 5px 10px #C7C8C9FF",
          borderRadius: "10px",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ height: 30 }} />
        <Form
          className="my-4"
          onSubmit={login}
          style={{
            display: "flex",
            flexDirection: "column",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AlertMessageLogin info={alert} />
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              required
              value={username}
              onChange={onChangeLoginForm}
              style={{
                fontSize: 20,
                height: 45,
                borderRadius: 10,
                paddingLeft: 10,
                borderWidth: 1,
              }}
            />
          </Form.Group>
          <div style={{ height: 20 }}></div>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChangeLoginForm}
              style={{
                fontSize: 20,
                height: 45,
                borderRadius: 10,
                paddingLeft: 10,
                borderWidth: 1,
              }}
              required
            />
          </Form.Group>
          <div style={{ height: 20 }}></div>

          <Button
            variant="success"
            type="submit"
            style={{
              height: 20,
              width: 200,
              height: 45,
              fontSize: 20,
              borderRadius: 10,
              borderWidth: 0,
              fontWeight: "bold",
              backgroundColor: ColorConstant.mdarkblue,
              color: "white",
            }}
          >
            Login
          </Button>
        </Form>
        <p>
          Chưa có tài khoản? {"     "}
          <Button
            variant="info"
            size="sm"
            className="ml-2"
            style={{
              borderWidth: 0,
              backgroundColor: "transparent",
              fontSize: 16,
              color: ColorConstant.mblue,
            }}
          >
            Đăng kí{" "}
          </Button>
        </p>
      </div>
    </div>
  );
}

export default LoginScreen;
