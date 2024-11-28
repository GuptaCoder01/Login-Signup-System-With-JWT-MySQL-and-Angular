const { verifyToken } = require('../utils/jwtUtils');
const logger = require('../utils/logger');

module.exports = (req, res, next) => {

    const skipRoutes = ['/api/auth/register', '/api/auth/login'];
    // const skipRoutes = ['/api/auth/', '/api/auth/'];
    if (skipRoutes.includes(req.originalUrl)) {
        return next()
    }

    const token = req.headers['authorization'];
    logger.info(`Authorization header:", ${token}`);

    if (!token) {
        logger.warn('Unauthorized request, token missing');
        return res.status(401).json({ message: 'Unauthorized, token missing' });
    }

    if (token.startsWith('Bearer ')) {
        try {
            const decoded = verifyToken(token.split(' ')[1]);
            req.userId = decoded.id;
            logger.info(`Token valid for user ID : ${req.userId}`)
            next();
        } catch (err) {
            logger.error(`Invalid or expired token: ${err.message}`)
            res.status(401).json({ message: "Invalid or expired token" });
        }
    } else {
        logger.warn('Unauthorized request, invalid token format');
        return res.status(401).json({ message: 'Unauthorized, invalid token format' });
    }
};
