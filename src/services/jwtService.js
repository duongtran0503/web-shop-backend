const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
class jwtService {
    generateAccessToken = async (payload) => {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
            expiresIn: '1h',
        });
        console.log(accessToken);
        return accessToken;
    };
    generateRfreshToken = async (payload) => {
        const refresh_token = jwt.sign(payload, process.env.REFREST_TOKEN, {
            expiresIn: '30d',
        });
        return refresh_token;
    };
    //[GET]
    refreshToken = async (token) => {
        try {
            return new Promise((resolve, reject) => {
                jwt.verify(token, process.env.REFREST_TOKEN, (error, user) => {
                    if (error) {
                        console.error(error);
                        return resolve({
                            status: 'error',
                            message: 'authentication failed',
                            code: 400,
                            success: false,
                        });
                    }

                    const { id, isAdmin } = user;
                    const accessToken = jwt.sign(
                        { id, isAdmin },
                        process.env.ACCESS_TOKEN,
                        { expiresIn: '1h' }
                    );

                    return resolve({
                        status: 'ok',
                        message: 'success',
                        code: 200,
                        accessToken: accessToken,
                        success: true,
                    });
                });
            });
        } catch (error) {
            console.error(error);
            return {
                status: 'failed',
                message: error.message,
                success: false,
                code: 400,
            };
        }
    };
}
module.exports = new jwtService();
