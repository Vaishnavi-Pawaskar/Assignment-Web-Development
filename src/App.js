
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import EmployeeList from "./EmployeeList"; 
import Dashboard from "./Dashboard";
import Login from "./Login";
import CreateEmployee from "./CreateEmployee";




const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("loggedInUser")
  );

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard/> : <Login />}
        />
        <Route
          path="/create-employee"
          element={isLoggedIn ? <CreateEmployee /> : <Login />}
        />
        <Route
          path="/employee-list"
          element={isLoggedIn ? <EmployeeList/> : <Login />}
        />
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        
      </Routes>
    </Router>
  );
};

export default App;
