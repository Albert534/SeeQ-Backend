const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './config.env' });

// Database connection configuration
const pool = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	ssl: {
		rejectUnauthorized: false,
		ca: process.env.CERTIFICATE,
	},
});

module.exports = pool;
