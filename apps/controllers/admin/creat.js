"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdmin = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const admin_1 = require("../../models/admin");
const configs_1 = require("../../configs");
const uuid_1 = require("uuid");
const requestCheker_1 = require("../../utilities/requestCheker");
const checkAuth_1 = require("../../utilities/checkAuth");
const createAdmin = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['adminName', 'adminEmail', 'adminPassword'],
        requestData: { ...requestBody, ...req.headers }
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const checkCurrentAdmin = await (0, checkAuth_1.isSuperAdmin)({
            adminId: req.body?.user?.userId
        });
        if (checkCurrentAdmin !== null) {
            const message = 'access denied!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response);
        }
        const checkIsUserAlreadyExis = await admin_1.AdminModel.findOne({
            raw: true,
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                adminEmail: { [sequelize_1.Op.eq]: requestBody.adminEmail }
            }
        });
        if (checkIsUserAlreadyExis?.adminEmail != null) {
            const message = 'Email sudah terdatar. Silahkan gunakan email lain.';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response);
        }
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const hashPassword = require('crypto')
            .createHash('sha1')
            .update(requestBody.adminPassword + configs_1.CONFIG.secret.passwordEncryption)
            .digest('hex');
        requestBody.adminId = (0, uuid_1.v4)();
        requestBody.adminPassword = hashPassword;
        requestBody.adminCreatedBy = '';
        await admin_1.AdminModel.create(requestBody);
        const response = response_1.ResponseData.default;
        response.data = { message: 'success' };
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.createAdmin = createAdmin;
