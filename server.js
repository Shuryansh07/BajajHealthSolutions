const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/bfhl', require('./routes/bfhlRoutes'));

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB()
    .then(() => {
        // Only start server after DB connection is established
        app.listen(PORT, () => {
            console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    });

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        is_success: false,
        error: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message
    });
}); 