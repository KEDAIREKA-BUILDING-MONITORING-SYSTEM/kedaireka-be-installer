"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const response_1 = require("../../utilities/response");
const requestCheker_1 = require("../../utilities/requestCheker");
const user_1 = require("../../models/user");
const scure_password_1 = require("../../utilities/scure_password");
const jwt_1 = require("../../utilities/jwt");
const userLogin = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['userEmail', 'userPassword'],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const user = await user_1.UserModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userEmail: { [sequelize_1.Op.eq]: requestBody.userEmail }
            }
        });
        if (user == null) {
            const message = 'Akun tidak ditemukan. Silahkan lakukan pendaftaran terlebih dahulu!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        if ((0, scure_password_1.hashPassword)(requestBody.userPassword) !== user.userPassword) {
            const message = 'kombinasi email dan password tidak ditemukan!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response);
        }
        const token = (0, jwt_1.generateAccessToken)({
            userId: user.userId,
            userRole: user.userRole
        });
        const response = response_1.ResponseData.default;
        response.data = { token };
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.userLogin = userLogin;
