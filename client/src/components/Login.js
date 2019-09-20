import React, {useState, useEffect} from "react";
import axios from 'axios';
import {axiosWithAuth} from './AxiosAuth';
import {Input, Button} from 'semantic-ui-react';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [creds, setCreds] = useState({
    username: "",
    password: ""
  })
  const handleSubmit = e=>{
    e.preventDefault();
    // console.log("submit");
    // console.log(creds);
    axiosWithAuth()
    .post('/login', creds)
    .then(res=>{
      // console.log(res);
      // console.log()
      localStorage.setItem("token", res.data.payload);
      props.history.push('/bubbles');
    })
    .catch(err=>{
      console.log(err);
    })
    
  }
  const handleChange = e =>{
    setCreds({
      ...creds,
      [e.target.name] : e.target.value
    })

  }
  return (
    <>
      {/* <h1>Login to see bubbles!</h1> */}
      <form onSubmit={handleSubmit} className="login-form">
        <Input placeholder="Enter Username..." name="username" value ={creds.username} onChange ={handleChange}/>
        <Input placeholder="Enter Password..." name="password" value ={creds.password} onChange={handleChange}/>
        <Button>Submit</Button>
      </form>
    </>
  );
};

export default Login;
