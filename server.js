const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load env vars
dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Health check route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running' });
});

// Routes
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input data"
            });
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item) && item.length === 1);
        const highest_alphabet = alphabets.length > 0 ? 
            [alphabets.reduce((a, b) => a.toLowerCase() > b.toLowerCase() ? a : b)] : 
            [];

        res.status(200).json({
            is_success: true,
            user_id: process.env.USER_ID || "john_doe_17091999",
            email: process.env.EMAIL || "john@college.edu",
            roll_number: process.env.ROLL_NUMBER || "ABCD123",
            numbers,
            alphabets,
            highest_alphabet
        });
    } catch (error) {
        res.status(500).json({
            is_success: false,
            error: error.message
        });
    }
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        is_success: false,
        error: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message
    });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running in development mode on port ${PORT}`);
    });
}

module.exports = app; 