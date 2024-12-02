import dotenv from 'dotenv';

import express, {Request, Response} from "express";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import cors from 'cors';
import User, {IUserLoginRequest, IUserRegisterRequest} from "./schema/User";
import {umbrellaUri} from "./db/config/DatabaseConfig";
import Employee, {IEmployeeRequest} from "./schema/Employee";
import {MongoError} from "mongodb";
import {getEnvValueOrDefault} from "./utils/env-var-loader/getEnvValue";

const app = express();
const port = getEnvValueOrDefault('PORT', '3000');

dotenv.config();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

mongoose.connect(umbrellaUri).then(() => console.log("Connected to DB"))
    .catch(err => console.log(err));


app.get("/health", (req, res) => {
    res.send('OK');
});

// @ts-ignore
app.post("/register", async (req: Request<{}, {}, IUserRegisterRequest>, res: Response) => {
    const {email, password, username} = req.body;

    try {
        const existingUser = await User.findOne({email: email});

        if (existingUser) {
            return res.status(400).json({message: "Failed to register user"});
        }

        const user = new User({email, password, username});
        await user.save();
        res.status(200).json({message: "User registered"});
    } catch (err) {
        res.status(500).json({message: 'Error registering user', error: err});
    }
});

// @ts-ignore
app.post("/login", async (req: Request<{}, {}, IUserLoginRequest>, res: Response) => {
    const {email, password} = req.body;

    try {
        const existingUser = await User.findOne({email: email});

        if (!existingUser) {
            return res.status(400).json({message: "Invalid email or password"});
        }

        const isMatch = await existingUser.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({message: "Invalid email or password"});
        }

        const secret = process.env.JWT_SECRET || '';
        const token = jwt.sign({userId: existingUser._id, email: existingUser.email}, secret, {expiresIn: "1h"});

        res.status(200).json({message: "User logged in", token});
    } catch (error) {
        res.status(500).json({message: 'Error during authentication'});
    }
});

// @ts-ignore
app.post('/employee/new', async (req: Request<{}, {}, IEmployeeRequest>, res: Response) => {
    const request: IEmployeeRequest = req.body;

    try {
        const employee = new Employee({...request});
        await employee.save();
        res.status(201).json({message: "Employee created"});
    } catch (error) {
        if (error instanceof MongoError && error.code === 11000) {
            res.status(400).json({message: 'Failed to create employee'});
        } else {
            res.status(500).json({message: 'Error while creating employee', error});
        }
    }
});

app.get('/employees', async (req: Request, res: Response) => {
    try {
        const employees = await Employee.find({});
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({message: 'Error returning employees'});
    }
});

// @ts-ignore
app.get('/employee/search', async (req: Request, res: Response) => {
    const email = req.query.email as string;
    const pesel = req.query.pesel as string;

    if (!email || !pesel) {
        return res.status(400).json({ message: 'Both email and pesel are required' });
    }

    try {
        const employee = await Employee.findOne({
            'personalData.email': email,
            'personalData.pesel': pesel
        });

        if (!employee) {
            return res.status(404).json({ message: 'Failed to find employee' });
        }

        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({
            message: 'Error while retrieving employee',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// @ts-ignore
app.get('/employee/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findOne({ '_id': id });

        if (!employee) {
            return res.status(404).json({ message: 'Failed to retrieve employee'});
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Error while retrieving employee' });
    }
});

// @ts-ignore
app.put('/employee/:id', async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params;
   const request: IEmployeeRequest = req.body;

   try {
       await Employee.findByIdAndUpdate(id, request);
       return res.status(200).json({message: 'Employee updated'});
   } catch (error) {
       res.status(500).json({message: 'Error while updating employee', error: (error as Error).message});
   }
});


// @ts-ignore
app.delete('/employee/:id', async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
        await Employee.findByIdAndDelete(id);

        return res.status(200).json({message: 'Employee deleted'});
    } catch (error) {
        res.status(500).json({message: 'Error while deleting employee', error: (error as Error).message});
    }
});

app.get('/db', async (req: Request, res: Response) => {
    try {
        const admin = mongoose.connection.db?.admin();
        const databasesResult = await admin?.listDatabases();

        res.status(200).json({"databases": databasesResult});
    } catch (err) {
        res.status(500).json({message: 'Error listing database'});
    }
});

app.listen(port, () => {
    console.log("Server running on port: " + port);
});