const winston = require('winston')

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} [${level}]: ${message}`;
})

const logger = winston.createLogger({
	level: 'info',
	format: combine(
		timestamp(),
		colorize(),
		logFormat
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'log/app.log' })
	]
})

module.exports = logger;