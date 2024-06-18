const userService = require('../services/user.service');
const jwtService = require('../services/jwtService');
class UserController {
    // POST:: create account
    async createUser(req, res) {
        try {
            const user = req.body;
            const isEmail = (email) => {
                return String(email)
                    .toLowerCase()
                    .match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    );
            };
            if (!user.email || !user.password) {
                return res.status(400).json({
                    message: 'Required information is invalid',
                    success: false,
                });
            }
            if (!isEmail(user.email)) {
                return res.status(400).json({
                    message: 'invalid email',
                    success: false,
                });
            }
            const response = await userService.createUser(user);

            return res.status(response.code).json(response);
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                status: 'failed',
                message: 'Internal Server Error',
                success: false,
                code: 500,
            });
        }
    }

    // [POST]::user login
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const isEmail = (email) => {
                return String(email)
                    .toLowerCase()
                    .match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    );
            };
            if (!email || !password) {
                return res.status(400).json({
                    message: 'Required information is invalid',
                    success: false,
                });
            }
            if (!isEmail(email)) {
                return res.status(400).json({
                    message: 'invalid email',
                    success: false,
                });
            }

            const response = await userService.login(email, password);
            const { refresh_token, ...data } = response;
            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                path: '/',
            });
            return res.status(response.code).json(data);
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                status: 'failed',
                message: 'Internal Server Error',
                success: false,
                code: 500,
            });
        }
    }
    // [PUT] :: update info user pareme: id user
    async update(req, res) {
        try {
            const userId = req.params.id;
            const data = req.body;
            console.log(data);
            if (!data) {
                return res.status(500).json({
                    status: 'failed',
                    message: 'Internal Server Error',
                    success: false,
                    code: 500,
                });
            }
            const response = await userService.update(userId, data);
            return res.status(response.code).json(response);
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                status: 'failed',
                message: 'Internal Server Error',
                success: false,
                code: 500,
            });
        }
    }
    // [POST] delete user params => id
    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            if (!userId) {
                return res.status(400).json({ message: 'user id is required' });
            }
            const response = await userService.deleteUser(userId);

            return res.status(response.code).json(response);
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                status: 'failed',
                message: 'Internal Server Error',
                success: false,
                code: 500,
            });
        }
    }
    // [GET] get all user
    async getAll(req, res) {
        try {
            const response = await userService.getAll();

            return res.status(response.code).json(response);
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                status: 'failed',
                message: 'Internal Server Error',
                success: false,
                code: 500,
            });
        }
    }
    // [GET] detail user
    async getDetail(req, res) {
        try {
            const userId = req.params.id;
            if (!userId) {
                return res.status(400).json({ message: 'user id is required' });
            }
            const response = await userService.getDetail(userId);
            return res.status(response.code).json(response);
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                status: 'failed',
                message: 'Internal Server Error',
                success: false,
                code: 500,
            });
        }
    }
    // [GET] refresh token
    async refreshToken(req, res) {
        try {
            console.log('refreah token action ');
            const checkToken = req.cookies.refresh_token;
            console.log(checkToken);
            if (!checkToken) {
                return res.status(200).json({
                    status: 'error',
                    message: 'token is undefined',
                });
            }
            const token = checkToken;
            const response = await jwtService.refreshToken(token);

            return res.status(response.code).json(response);
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                status: 'failed',
                message: 'Internal Server Error',
                success: false,
                code: 500,
            });
        }
    }
    // [POST]
    async logout(req, res) {
        try {
            res.clearCookie('refresh_token');
            return res.status(200).json({
                message: 'logout success',
                success: true,
                status: 'OK',
            });
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                status: 'failed',
                message: 'Internal Server Error',
                success: false,
                code: 500,
            });
        }
    }
}
module.exports = new UserController();
