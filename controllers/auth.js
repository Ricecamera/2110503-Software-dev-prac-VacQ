const User = require('../models/User');

//@desc		Register user
//@route	POST /api/v1/auth/register
//@access	Public
exports.register = async (req, res, next) => {
	try {
		const { name, email, password, role } = req.body;

		// Create User
		const user = await User.create({
			name,
			email,
			password,
			role,
		});

		// Create token
		// const token = user.getSignedJWTToken();
		// res.status(200).json({ success: true });
		sentTokenResponse(user, 200, res);
	} catch (err) {
		res.status(400).json({ success: false });
		console.log(err.stack);
	}
};

//@desc		Login user
//@route	POST /api/v1/auth/login
//@access	Public
exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	//Validate email & password
	if (!email || !password)
		return res
			.status(400)
			.json({ success: false, msg: 'Please provide an email and password' });

	const user = await User.findOne({ email }).select('password');

	if (!user) {
		return res.status(400).json({ success: false, msg: 'Invalid credentials' });
	}

	//Check if password matches
	const isMatch = await user.matchPassword(password);

	if (!isMatch)
		return res.status(401).json({ success: false, msg: 'Invalid credentials' });

	//Create token
	// const token = user.getSignedJWTToken();
	// res.status(200).json({ sucess: true, token });
	sentTokenResponse(user, 200, res);
};

function sentTokenResponse(user, statusCode, res) {
	//Create token
	const token = user.getSignedJWTToken();

	const options = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};

	if (process.env.NODE_ENV === 'production') {
		options.secure = true;
	}

	res.status(statusCode).cookie('VacQ token', token, options).json({
		success: true,
		token,
	});
}

//@desc		Get current Logged in user
//@rooute	POST /api/v1/auth/me
//@access	Private
exports.getMe = async (req, res, next) => {
	const user = await User.findById(req.user.id);
	res.status(200).json({
		sucess: true,
		data: user,
	});
};
