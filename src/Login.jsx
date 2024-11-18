import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../src/login.css"


const Login = ({ setIsLoggedIn }) => {
      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const navigate = useNavigate();
    
      const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:5000/api/login", {
            username,
            password,
          });
          alert(response.data.message);
          localStorage.setItem("loggedInUser", username);
          setIsLoggedIn(true);
          navigate("/dashboard");
        } catch (error) {
          alert("Invalid login details");
        }
      };
    
      return (
        <div className="form">
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <label className="title">
              Username:
              <input className="in"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <br />
            <label className="title">
              Password:
              <input className="in"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
            <button className="btn" type="submit">Login</button>
          </form>
        </div>
      );
    };
    
    export default Login;