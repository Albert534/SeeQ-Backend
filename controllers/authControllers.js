const pool = require('../models/db');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const bcrypt = require('bcrypt');
const { query } = require('express');
const jwt = require('jsonwebtoken');

const SALT = 12;

// Function to hash password
const hashPassword = (password) =>
	bcrypt.hash(password, SALT).catch(() => {
		throw new AppError('Password hashing failed', 500);
	});

const comparePassword = async (currentPassword, passwordToCompare) => {
	return await bcrypt.compare(currentPassword, passwordToCompare);
};

//Creating Auth Token
const createToken = (username) => {
	id = `SELECT id FROM users WHERE username = ${username}`;
	const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
	return token;
};
// User creation controller
const userCreation = catchAsync(async (req, res, next) => {
	const { username, email, password } = req.body;

	const cookiesExpiryDate = Number(process.env.JWT_EXPIRES_IN) || 90;

	//Cookie Option for Web
	const cookieOptions = {
		expires: new Date(Date.now() + cookiesExpiryDate * 24 * 60 * 60 * 1000),
		secure: process.env.NODE_ENV === 'production',
		httpOnly: true,
	};

	if (!username || !email || !password)
		return next(new AppError('Missing required fields', 400));

	//Regular Expression for Gmail

	if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email))
		return next(new AppError('Invalid email format', 400));

	if (password.length < 6)
		return next(
			new AppError('Password must be at least 6 characters long', 400)
		);

	const hashedPassword = await hashPassword(password);
	const token = createToken(req.body.username);
	const query =
		'INSERT INTO users (username, email, password , token) VALUES ($1, $2, $3 ,$4) RETURNING id';

	try {
		await pool.connect();
		const result = await pool.query(query, [
			username,
			email,
			hashedPassword,
			token,
		]);
		if (!result.rowCount) throw new Error();
		//Cookies
		res.cookie('jwt', token, cookieOptions);
		res.status(201).json({
			status: 'success',
			message: 'User created successfully',
			data: { userId: result.rows[0].id },
		});
	} catch {
		return next(new AppError('Database operation failed', 500));
	}
});

//Login
const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	// Check if email and password are provided
	if (!email || !password) {
		return next(new AppError('Email and Password must be provided', 400));
	}

	const userCheckQuery = `
        SELECT id, username, password, active 
        FROM users 
        WHERE email = $1
    `;
	const userResult = await pool.query(userCheckQuery, [email]);

	// Check if the user exists
	if (!userResult.rows[0]) {
		return next(new AppError('Invalid email or password', 401)); // Unauthorized
	}

	const user = userResult.rows[0];

	// Validate the password
	const isPasswordValid = await comparePassword(password, user.password); // Ensure comparePassword is async
	if (!isPasswordValid) {
		return next(new AppError('Invalid email or password', 401)); // Unauthorized
	}

	// Ensure the user is active
	if (!user.active) {
		return next(new AppError('Account is not active. Contact support.', 403)); // Forbidden
	}
	console.log(user.username);
	// Create and send token
	const token = createToken(user.username, 200, res);
	if (token) {
		res.status(201).json({
			status: 'success',
			message: 'User login successfully',
			data: { userId: user.id },
		});
	} else {
		return next(new AppError('Token is invalid', 400));
	}
});

module.exports = { userCreation, login };
