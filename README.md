# Umbrella API

Umbrella API is an Express-based REST API designed to manage user and employee data, including registration, authentication, and employee management. This API connects to a MongoDB instance and is intended for secure and efficient data handling.

## Table of Contents
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Endpoints](#endpoints)
    - [Health Check](#health-check)
    - [User Registration](#user-registration)
    - [User Login](#user-login)
    - [Create New Employee](#create-new-employee)
    - [Get Employee by Email](#get-employee-by-email)
    - [Search for Employee by Email and PESEL](#search-for-employee-by-email-and-pesel)
    - [List All Employees](#list-all-employees)
- [Testing](#testing)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/papazouk/umbrella-api.git
   cd umbrella-api

## Environment Variables

Create a `.env` file in the root directory and specify the following variables:

- `PORT`: Port for the API server (default is `3000`)
- `MONGO_URI`: MongoDB connection URI for connecting to the database
- `JWT_SECRET`: Secret key for JWT token signing

Example `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/umbrella-api
JWT_SECRET=your_secret_key
```

## Endpoints

### Health Check

**GET** `/`

Checks if the API is running.

#### Response

- **200 OK**: Returns a message confirming the API is active.

---

### User Registration

**POST** `/register`

Registers a new user.

#### Request Body

- `email` (string, required): User’s email
- `password` (string, required): User’s password
- `username` (string, required): User’s username

#### Response

- **201 Created**: User registered successfully
- **400 Bad Request**: User with the provided email already exists
- **500 Internal Server Error**: Error registering the user

---

### User Login

**POST** `/login`

Logs in an existing user and returns a JWT token.

#### Request Body

- `email` (string, required): User’s email
- `password` (string, required): User’s password

#### Response

- **200 OK**: Returns a JWT token
- **400 Bad Request**: Invalid email or password
- **500 Internal Server Error**: Error during authentication

---


### Create New Employee

**POST** `/employee/new`

Creates a new employee record.

#### Request Body

- `personalData` (object, required)
  - `firstName` (string, required): Employee’s first name
  - `lastName` (string, required): Employee’s last name
  - `email` (string, required): Employee’s email
  - `pesel` (string, required): Employee’s unique identifier (PESEL)
  - `clothSize` (string, optional): Employee’s clothing size
  - `address1`, `address2` (object, optional): Address information
- `jobDetails` (object, required): Job-related details

#### Response

- **200 OK**: Employee created successfully
- **400 Bad Request**: Duplicate entry error (e.g., unique fields)
- **500 Internal Server Error**: Error while creating employee

---

### Get Employee by Email

**GET** `/employee/:email`

Fetches an employee’s information based on their email.

#### Parameters

- `email` (string, required): Employee’s email address

#### Response

- **200 OK**: Returns employee details
- **404 Not Found**: Employee not found
- **500 Internal Server Error**: Error while retrieving employee

---

### Search for Employee by Email and PESEL

**GET** `/employee/search`

Searches for an employee based on email and PESEL (query parameters).

#### Query Parameters

- `email` (string, required): Employee’s email
- `pesel` (string, required): Employee’s PESEL

#### Response

- **200 OK**: Returns employee details
- **400 Bad Request**: Missing email or PESEL in the query
- **404 Not Found**: Employee not found
- **500 Internal Server Error**: Error while retrieving employee

---

### List All Employees

**GET** `/employees`

Fetches all employees.

#### Response

- **200 OK**: Returns a list of all employees