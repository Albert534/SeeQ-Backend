const pool = require('../models/db');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//Getting all users for the frontend validations
const getUserInfo = catchAsync(async (req, res, next) => {
	const getAllUser = 'SELECT email, password FROM users';
	const result = await pool.query(getAllUser);
	res.status(200).json({
		message: 'User Data are fetched Successfully',
		users: result,
	});
	if (!result) {
		return next(new AppError('Error Fetching User Data'), 500);
	}
});

module.exports = { getUserInfo };
