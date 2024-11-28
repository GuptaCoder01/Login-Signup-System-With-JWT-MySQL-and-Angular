const jwt = require('jsonwebtoken');
const SECRET_KEY = 'login@123';
const logger = require('./logger')

// exports.generateToken = (userId) => {
// 	return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
// }

// exports.verifyToken = (token) => {
// 	return jwt.verify(token, SECRET_KEY);
// }


exports.generateToken = (userId) => {
	try {
		const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' })
		logger.info(`Token generated for user ID: ${userId}`);
		return token;
	} catch (err) {
		logger.error(`Error generating token for user ID: ${userId} - ${err.message}`);
		throw new Error('Error generating token');

	}
}

exports.verifyToken = (token) => {
	try {
		const decoded = jwt.verify(token, SECRET_KEY);
		logger.info(`Token verified successfully`);
		return decoded;
	} catch (err) {
		logger.error(`Error verifying token: ${err.message}`);
		throw new Error('Invalid or expired token');
	}
}