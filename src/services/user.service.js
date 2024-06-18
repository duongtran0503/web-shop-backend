const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwtService = require('./jwtService');
const resultType = require('./resultType');
class UserService {
    //  [POST]::create account
    async createUser(user) {
        try {
            console.log(user);
            const existingUser = await User.findOne({ email: user.email });
            if (existingUser) {
                return resultType.error({
                    status: 'failed',
                    message: 'User already exists',
                    success: false,
                    code: 400,
                });
            }
            const hash = await bcrypt.hash(user.password, 10);
            user.password = hash;
            const newUser = await User.create(user);
            return {
                status: 'OK',
                success: true,
                code: 200,
                data: newUser,
            };
        } catch (error) {
            return {
                status: 'failed',
                message: 'Internal Server Error',
                success: false,
                code: 500,
            };
        }
    }

    // [POST]::user login
    async login(email, password) {
        try {
            const existingUser = await User.findOne({ email: email });

            if (!existingUser) {
                return {
                    status: 'failed',
                    message: 'User not exists',
                    success: false,
                    code: 400,
                };
            }

            const checklogin = await bcrypt.compare(
                password,
                existingUser.password
            );

            if (!checklogin) {
                return {
                    status: 'failed',
                    message: 'password not confirm',
                    success: false,
                    code: 400,
                };
            }
            const payload = {
                id: existingUser.id,
                isAdmin: existingUser.isAdmin,
            };
            const access_token = await jwtService.generateAccessToken(payload);

            const refresh_token = await jwtService.generateRfreshToken(payload);
            return {
                statsu: 'OK',
                message: 'login success',
                success: true,
                code: 200,
                access_token,
                refresh_token,
            };
        } catch (error) {
            return {
                status: 'failed',
                message: 'Internal Server Error',
                success: false,
                code: 500,
            };
        }
    }
    // [PUT] update user
    async update(userId, data) {
        try {
            const checkUser = await User.findById(userId);

            if (!checkUser) {
                return {
                    status: 'failed',
                    message: 'User not exists',
                    success: false,
                    code: 400,
                };
            }

            const updateUser = await User.findByIdAndUpdate(userId, data, {
                new: true,
            });
            if (!updateUser) {
                return {
                    status: 'OK',
                    message: 'update failed',
                    success: failed,
                    code: 400,
                };
            }

            return {
                status: 'OK',
                message: 'update success',
                success: true,
                code: 200,
                data: updateUser,
            };
        } catch (error) {
            return {
                status: 'failed ',
                message: 'update failed',
                success: false,
                code: 400,
            };
        }
    }
    //[POST]
    async deleteUser(userId) {
        try {
            const checkUser = await User.findById(userId);
            if (!checkUser) {
                return {
                    status: 'failed',
                    message: 'user not already',
                    success: false,
                    code: 400,
                };
            }
            const deleUser = await User.findByIdAndDelete(userId);
            if (!deleUser) {
                return {
                    status: 'failed',
                    message: 'delete failed',
                    success: false,
                    code: 400,
                };
            }
            return {
                status: 'OK',
                message: 'delete success',
                success: true,
                code: 200,
            };
        } catch (error) {
            return {
                status: 'failed',
                message: 'delete failed',
                success: false,
                code: 400,
            };
        }
    }
    // [GET]
    async getAll() {
        try {
            const listUser = await User.find();
            return {
                status: 'OK',
                message: 'success',
                success: true,
                code: 200,
                data: listUser,
            };
        } catch (error) {
            return {
                status: 'failed',
                message: 'delete failed',
                success: false,
                code: 400,
            };
        }
    }
    // [GET] detail user
    async getDetail(userId) {
        try {
            const checkUser = await User.findById(userId)
                .select('-password')
                .lean();
            if (!checkUser) {
                return {
                    status: 'error',
                    message: 'user not exist',
                    code: 404,
                    success: false,
                };
            }

            return {
                status: 'OK',
                message: 'success',
                success: true,
                code: 200,
                data: checkUser,
            };
        } catch (error) {
            return {
                status: 'failed',
                message: error,
                success: false,
                code: 400,
            };
        }
    }
}

module.exports = new UserService();
