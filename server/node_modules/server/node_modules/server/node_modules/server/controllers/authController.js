const bcrypt = require('bcryptjs');
const db = require('../models/db')
const { generateToken } = require('../utils/jwtUtils')
const logger = require('../utils/logger');

exports.register = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		logger.warn('Registration attempt with missing fields');
		return res.status(400).json({ message: 'All fields are required' });
	}

	try {
		const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
		if (existingUser.length) {
			logger.warn(`Registration failed, user already exists: ${email}`);
			return res.status(400).json({ message: 'User already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

		logger.info(`User registered successfully: ${email}`);
		res.status(201).json({ message: 'User registered successfully' });
	} catch (err) {
		logger.error(`Error during registration: ${err.message}`);
		res.status(500).json({ message: 'Database error', error: err });
	}
};


exports.login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		logger.warn('Login attempt with missing fields');
		return res
			.status(400)
			.json({ message: "Username and password are required." });
	}
	try {
		const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
		if (!users.length) {
			logger.warn(`Login failed, invalid credentials for email: ${email}`);
			return res.status(400).json({ message: "Inavlid credentails" });
		}

		const user = users[0];
		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) {
			logger.warn(`Login failed, invalid password for email: ${email}`);
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const token = generateToken(user.id);
		logger.info(`User logged in successfully: ${email}`);
		res.status(200).json({ message: 'Login successful', token });
	} catch (err) {
		logger.error(`Error during login: ${err.message}`);
		res.status(500).json({ message: 'Database error', error: err })
	}
}

exports.dashboard = (req, res) => {
	logger.info(`User ${req.userId} accessed dashboard`)
	res.status(200).json({ message: `Welcome, User ${req.userId}! This is your dashboard.` });
};