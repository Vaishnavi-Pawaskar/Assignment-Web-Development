import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../src/Employee.css"

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Fetch employee data from the backend
        axios.get('http://localhost:5000/api/employees')
            .then((response) => setEmployees(response.data))
            .catch((error) => console.error('Error fetching employees:', error));
    }, []);

    return (
        <div>
            <h2>Employee List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Courses</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={index}>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.mobile}</td>
                            <td>{employee.designation}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.courses && employee.courses.length > 0
        ? employee.courses.join(", ") // Display joined courses
        : "No Courses Selected"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
