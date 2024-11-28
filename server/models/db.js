const mysql = require('mysql2');
const logger = require('../utils/logger')

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root@123',
	database: 'mean_auth',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});

pool.getConnection((err, connection) => {
	if (err) {
		logger.error((`Error while conntecting databse `))
		console.error('Error connecting to the database:', err.message);
	} else {
		logger.info(`Connected to DB`)
		console.log('Connected to the MySQL database.');
		connection.release();
	}
});
module.exports = pool.promise();