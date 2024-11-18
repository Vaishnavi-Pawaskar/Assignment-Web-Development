const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://127.0.0.1:27017/Mern',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));


const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});
const User = mongoose.model('t_login', UserSchema);


const EmployeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    designation: String,
    gender: String,
    courses: [String],
    createdDate: { type: Date, default: Date.now },
});
const Employee = mongoose.model('t_employee', EmployeeSchema);

app.use(express.json());

// Login API
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid login details' });
    }
});

// Add Employee API
app.post('/api/employees', async (req, res) => {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ message: 'Employee added successfully' });
});

// Get Employees API
app.get('/api/employees', async (req, res) => {
    const employees = await Employee.find();
    res.status(200).json(employees);
});



app.post("/api/employees", (req, res) => {
    const { name, email, mobile, designation, gender, courses } = req.body;

    if (!Array.isArray(courses)) {
        return res.status(400).send({ error: "Courses must be an array" });
    }

    // Store the employee data in the database (example response here)
    console.log({ name, email, mobile, designation, gender, courses });
    res.status(201).send({ message: "Employee created successfully" });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
