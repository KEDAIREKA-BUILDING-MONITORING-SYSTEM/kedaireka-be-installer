"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdmin = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const admin_1 = require("../../models/admin");
const checkAuth_1 = require("../../utilities/checkAuth");
const configs_1 = require("../../configs");
const updateAdmin = async (req, res) => {
    const requestBody = req.body;
    try {
        const checkCurrentAdmin = await (0, checkAuth_1.isSuperAdmin)({
            adminId: req.body?.user?.userId
        });
        if (checkCurrentAdmin === null) {
            const message = 'access denied!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response);
        }
        if ('adminPassword' in requestBody) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            requestBody.adminPassword = require('crypto')
                .createHash('sha1')
                .update(requestBody.adminPassword + configs_1.CONFIG.secret.passwordEncryption)
                .digest('hex');
        }
        const newData = {
            ...(requestBody.adminName.length > 0 && {
                adminName: requestBody.adminName
            }),
            ...(requestBody.adminEmail.length > 0 && {
                adminEmail: requestBody.adminEmail
            }),
            ...(requestBody.adminPassword.length > 0 && {
                adminPassword: requestBody.adminPassword
            }),
            ...(requestBody.adminRole.length > 0 && {
                adminRole: requestBody.adminRole
            })
        };
        await admin_1.AdminModel.update(newData, {
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                adminId: { [sequelize_1.Op.eq]: requestBody.adminId }
            }
        });
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
exports.updateAdmin = updateAdmin;
