import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import "../src/dashboard.css"




const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome to the Admin Panel</h1>
      <button className="btn1" onClick={() => navigate("/create-employee")}>Create Employee</button>
      <button  className="btn1" onClick={() => navigate("/employee-list")}>View Employee List</button>
      <button  className="btn1" onClick={handleLogout}>Logout</button>
    </div>
  );
};
  
export default Dashboard;