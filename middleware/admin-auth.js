const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.jwta;
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_KEYA);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};