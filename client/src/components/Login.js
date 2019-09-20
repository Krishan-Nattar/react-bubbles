import React, {useState, useEffect} from "react";
import axios from 'axios';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [creds, setCreds] = useState({
    username: "",
    password: ""
  })
  const handleChange = e =>{
    setCreds({
      ...creds,
      [e.target.name] : e.target.value
    })

  }
  return (
    <>
      <h1>Login to see bubbles!</h1>
      <form>
        <input placeholder="Enter Username..." name="username" value ={creds.username} onChange ={handleChange}/>
        <input placeholder="Enter Password..." name="password" value ={creds.password} onChange={handleChange}/>
        <button>Submit</button>
      </form>
    </>
  );
};

export default Login;
