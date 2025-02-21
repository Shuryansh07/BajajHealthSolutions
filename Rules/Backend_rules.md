# BFHL API Implementation Guide - MERN Stack

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Implementation Steps](#implementation-steps)
4. [Testing](#testing)
5. [Deployment](#deployment)
6. [Best Practices](#best-practices)

## Prerequisites
- Node.js and npm installed
- MongoDB installed and running
- Basic understanding of JavaScript
- Code editor (VS Code recommended)

## Project Setup

### 1. Create Project Structure
```bash
mkdir bfhl-api
cd bfhl-api
npm init -y
```

### 2. Install Dependencies
```bash
npm install express mongoose dotenv cors
```

### 3. Create Project Structure
```
bfhl-api/
  ├── config/
  │   └── db.js
  ├── controllers/
  │   └── bfhlController.js
  ├── routes/
  │   └── bfhlRoutes.js
  ├── models/
  │   └── userModel.js
  ├── .env
  ├── .gitignore
  ├── server.js
  └── package.json
```

## Implementation Steps

### 1. Environment Variables (.env)
```env:.env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bfhl-api
USER_ID=your_name_ddmmyyyy
EMAIL=your.email@college.edu
ROLL_NUMBER=your_roll_number
```

### 2. Database Configuration (config/db.js)
```javascript:config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
```

### 3. Controller Implementation (controllers/bfhlController.js)
```javascript:controllers/bfhlController.js
const getBfhl = (req, res) => {
    try {
        res.status(200).json({ operation_code: 1 });
    } catch (error) {
        res.status(500).json({ 
            is_success: false,
            error: error.message 
        });
    }
};

const postBfhl = (req, res) => {
    try {
        const { data } = req.body;
        
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input data"
            });
        }

        // Filter numbers and alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item) && item.length === 1);
        
        // Find highest alphabet
        const highest_alphabet = alphabets.length > 0 ? 
            [alphabets.reduce((a, b) => a.toLowerCase() > b.toLowerCase() ? a : b)] : 
            [];

        res.status(200).json({
            is_success: true,
            user_id: process.env.USER_ID,
            email: process.env.EMAIL,
            roll_number: process.env.ROLL_NUMBER,
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highest_alphabet
        });
    } catch (error) {
        res.status(500).json({
            is_success: false,
            error: error.message
        });
    }
};

module.exports = {
    getBfhl,
    postBfhl
};
```

### 4. Routes Setup (routes/bfhlRoutes.js)
```javascript:routes/bfhlRoutes.js
const express = require('express');
const router = express.Router();
const { getBfhl, postBfhl } = require('../controllers/bfhlController');

router.get('/', getBfhl);
router.post('/', postBfhl);

module.exports = router;
```

### 5. Server Setup (server.js)
```javascript:server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/bfhl', require('./routes/bfhlRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

### 6. Git Configuration (.gitignore)
```text:.gitignore
node_modules
.env
```

## Testing

### API Endpoints Testing

1. GET Request
- Endpoint: `http://localhost:5000/bfhl`
- Expected Response:
```json
{
    "operation_code": 1
}
```

2. POST Request
- Endpoint: `http://localhost:5000/bfhl`
- Request Body:
```json
{
    "data": ["M","1","334","4","8"]
}
```
- Expected Response:
```json
{
    "is_success": true,
    "user_id": "john_doe_17091999",
    "email": "john@college.edu",
    "roll_number": "ABCD123",
    "numbers": ["1","334","4","8"],
    "alphabets": ["M"],
    "highest_alphabet": ["M"]
}
```

## Deployment

### Heroku Deployment Steps

1. Update package.json
```json:package.json
{
    "scripts": {
        "start": "node server.js",
        "dev": "nodemon server.js"
    }
}
```

2. Heroku CLI Commands
```bash
heroku login
heroku create your-app-name
git add .
git commit -m "Initial commit"
git push heroku main
```

3. Configure Environment Variables
- Go to Heroku Dashboard → Settings → Config Vars
- Add all variables from .env file

## Best Practices

### 1. Error Handling
- Implement try-catch blocks
- Proper error responses
- Input validation
- Error logging

### 2. Security
- Use environment variables
- Implement CORS
- Input sanitization
- Rate limiting (optional)

### 3. Code Organization
- Modular structure
- Clean code principles
- Proper commenting
- Consistent naming conventions

### 4. API Design
- RESTful conventions
- Proper HTTP status codes
- Consistent response format
- Input validation

### 5. Testing Guidelines
- Test all endpoints
- Test edge cases
- Test error scenarios
- Performance testing

### 6. Maintenance
- Regular dependency updates
- Performance monitoring
- Error logging
- Database backups
- Documentation updates

## Response Format Examples

### GET /bfhl
```json
{
    "operation_code": 1
}
```

### POST /bfhl
```json
{
    "is_success": true,
    "user_id": "john_doe_17091999",
    "email": "john@college.edu",
    "roll_number": "ABCD123",
    "numbers": ["1","334","4","8"],
    "alphabets": ["M"],
    "highest_alphabet": ["M"]
}
```

## Error Response Format
```json
{
    "is_success": false,
    "error": "Error message description"
}
```

## Additional Notes

1. Always validate input data
2. Handle edge cases properly
3. Follow RESTful conventions
4. Maintain proper documentation
5. Regular testing and monitoring
6. Keep security best practices in mind
7. Regular code reviews and updates

This implementation provides a complete solution for the BFHL API requirements with proper error handling, input validation, and follows REST API best practices.
