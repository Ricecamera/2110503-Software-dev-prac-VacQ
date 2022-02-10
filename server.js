const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Routes
const hospitals = require('./routes/hospitals');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

//Connect to database
connectDB();

//Body praser
app.use(express.json());

app.use('/api/v1/hospitals', hospitals);

const PORT = process.env.PORT | 5000;

const server = app.listen(
	PORT,
	console.log('Server running in', process.env.NODE_ENV, 'mode on port', PORT)
);

process.on('unhandleRejection', (err, promise) => {
	console.log(`Error: ${err.message}`);
	// Close server & exit process
	server.close(() => process.exit(1));
});
