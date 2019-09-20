import React, { useState } from "react";
import { axiosWithAuth } from "./AxiosAuth";
import { Input, Button } from "semantic-ui-react";

const Login = props => {
  const [creds, setCreds] = useState({
    username: "",
    password: ""
  });
  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", creds)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubbles");
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleChange = e => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="login-form">
        <Input
          placeholder="Enter Username..."
          name="username"
          value={creds.username}
          onChange={handleChange}
        />
        <Input
          placeholder="Enter Password..."
          name="password"
          value={creds.password}
          onChange={handleChange}
        />
        <Button>Submit</Button>
      </form>
    </>
  );
};

export default Login;
