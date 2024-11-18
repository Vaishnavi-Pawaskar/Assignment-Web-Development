// 

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../src/createemp.css";

const CreateEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
  });

  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setEmployeeData((prevState) => ({
        ...prevState,
        courses: checked
          ? [...prevState.courses, value]
          : prevState.courses.filter((course) => course !== value),
      }));
    } else {
      setEmployeeData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!employeeData.name.trim()) errors.name = "Name is required.";
    if (!employeeData.email.trim()) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(employeeData.email))
      errors.email = "Enter a valid email.";
    if (!employeeData.mobile.trim()) errors.mobile = "Mobile number is required.";
    else if (!/^\d{10}$/.test(employeeData.mobile))
      errors.mobile = "Enter a valid 10-digit mobile number.";
    if (!employeeData.designation)
      errors.designation = "Designation is required.";
    if (!employeeData.gender) errors.gender = "Gender is required.";
    if (employeeData.courses.length === 0)
      errors.courses = "At least one course must be selected.";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Prevent submission if validation fails

    try {
      await axios.post("http://localhost:5000/api/employees", employeeData);
      alert("Employee created successfully!");
      navigate("/employee-list");
    } catch (error) {
      alert("Error creating employee");
    }
  };

  return (
    <div className="container">
      <h2>Create Employee</h2>
      <form className="info" onSubmit={handleSubmit}>
        <label className="title1">
          Name:
          <input
            className="in1"
            type="text"
            name="name"
            value={employeeData.name}
            onChange={handleChange}
          />
          {validationErrors.name && <p className="error">{validationErrors.name}</p>}
        </label>
        <br />
        <br />

        <label className="title1">
          Email:
          <input
            className="in1"
            type="email"
            name="email"
            value={employeeData.email}
            onChange={handleChange}
          />
          {validationErrors.email && <p className="error">{validationErrors.email}</p>}
        </label>
        <br />
        <br />

        <label className="title1">
          Mobile:
          <input
            className="in1"
            type="tel"
            name="mobile"
            value={employeeData.mobile}
            onChange={handleChange}
          />
          {validationErrors.mobile && <p className="error">{validationErrors.mobile}</p>}
        </label>
        <br />
        <br />

        <label className="title1">
          Designation:
          <select
            className="in1"
            name="designation"
            value={employeeData.designation}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          {validationErrors.designation && (
            <p className="error">{validationErrors.designation}</p>
          )}
        </label>
        <br />
        <br />

        <label className="title1">
          Gender:
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={employeeData.gender === "Male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={employeeData.gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
          {validationErrors.gender && <p className="error">{validationErrors.gender}</p>}
        </label>
        <br />
        <br />

        <label className="title1">
          Courses:
          <label>
            <input
              type="checkbox"
              name="courses"
              value="MCA"
              checked={employeeData.courses.includes("MCA")}
              onChange={handleChange}
            />
            MCA
          </label>
          <label>
            <input
              type="checkbox"
              name="courses"
              value="BCA"
              checked={employeeData.courses.includes("BCA")}
              onChange={handleChange}
            />
            BCA
          </label>
          <label>
            <input
              type="checkbox"
              name="courses"
              value="BSc"
              checked={employeeData.courses.includes("BSc")}
              onChange={handleChange}
            />
            BSc
          </label>
          {validationErrors.courses && (
            <p className="error">{validationErrors.courses}</p>
          )}
        </label>
        <br />
        <br />

        <button className="btn2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateEmployee;
