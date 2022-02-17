const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Routes
const hospitals = require('./routes/hospitals');
const auth = require('./routes/auth');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

//Connect to database
connectDB();

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

app.use('/api/v1/hospitals', hospitals);
app.use('/api/v1/auth', auth);

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
