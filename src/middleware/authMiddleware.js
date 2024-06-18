const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { use } = require('../routes/user.route');
dotenv.config();
const authMiddleware = (req, res, next) => {
    const checkToken = req.headers.token;
    if (!checkToken) {
        return res.status(400).json({ message: 'token  is undefined' });
    }
    const token = checkToken.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res
                .status(400)
                .json({ message: 'the authentication', status: 'error' });
        }

        if (user.isAdmin) {
            return next();
        }
        return res.status(400).json({
            message: "user don't have permission",
            status: 'error',
            success: false,
        });
    });
};
// check auth user
const authUserMiddleware = (req, res, next) => {
    const checkToken = req.headers.token;
    if (!checkToken) {
        return res.status(400).json({ message: 'token  is undefined' });
    }

    const token = checkToken.split(' ')[1];
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ message: 'user id is undefined' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res
                .status(400)
                .json({ message: 'the authentication', status: 'error' });
        }
        if (user?.isAdmin || user?.id === userId) {
            return next();
        }
        return res.status(400).json({
            message: "user don't have permission",
            status: 'error',
            success: false,
        });
    });
};
module.exports = { authMiddleware, authUserMiddleware };
