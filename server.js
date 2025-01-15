const pool = require('./models/db'); // Adjust the path as necessary
const app = require('./app');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './config.env' });

// Start the server
const port = process.env.PORT || 3000;

const getDatabaseVersion = async (req, res) => {
	try {
		await pool.connect(); // Connect to the database

		const result = await client.query('SELECT VERSION()');
		res.status(200).json({ version: result.rows[0].version });
		console.log('Database connection successful');
	} catch (err) {
		console.error('Database error', err.stack);
		return res.status(500).json({ error: 'Database connection error' });
	} finally {
		await pool.end(); // End the connection after the query
	}
};

// Define a route to check the database version
app.get('/db-version', getDatabaseVersion);

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
