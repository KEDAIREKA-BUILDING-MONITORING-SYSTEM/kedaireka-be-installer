"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const admin_1 = require("../../models/admin");
const uuid_1 = require("uuid");
const requestCheker_1 = require("../../utilities/requestCheker");
const configs_1 = require("../../configs");
const session_1 = require("../../models/session");
const loginAdmin = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['adminEmail', 'adminPassword'],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const checkAdmin = await admin_1.AdminModel.findOne({
            raw: true,
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                adminEmail: { [sequelize_1.Op.eq]: requestBody.adminEmail }
            }
        });
        if (checkAdmin == null) {
            const message = 'User belum terdaftar.';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response);
        }
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const hashPassword = require('crypto')
            .createHash('sha1')
            .update(requestBody.adminPassword + configs_1.CONFIG.secret.passwordEncryption)
            .digest('hex');
        if (hashPassword !== checkAdmin.adminPassword) {
            const message = 'Kombinasi email dan password tidak dikenal';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response);
        }
        const expired = new Date();
        expired.setHours(expired.getDate() + 10);
        const checkSession = await session_1.SessionModel.findOne({
            raw: true,
            where: {
                sessionId: { [sequelize_1.Op.eq]: checkAdmin?.adminId },
                deleted: { [sequelize_1.Op.eq]: 0 }
            }
        });
        const sessionData = {
            sessionId: (0, uuid_1.v4)(),
            sessionAdminId: checkAdmin?.adminId,
            session: (0, uuid_1.v4)(),
            sessionExpiredOn: expired.getTime(),
            deleted: 0
        };
        if (checkSession == null) {
            await session_1.SessionModel.create(sessionData);
        }
        else {
            await session_1.SessionModel.update(sessionData, {
                where: {
                    sessionId: { [sequelize_1.Op.eq]: checkAdmin?.adminId },
                    deleted: { [sequelize_1.Op.eq]: 0 }
                }
            });
        }
        const responseData = {
            adminId: checkAdmin?.adminId,
            adminName: checkAdmin?.adminName,
            adminEmail: checkAdmin?.adminEmail,
            adminRole: checkAdmin.adminRole,
            session: sessionData.session,
            sessionExpiredOn: sessionData.sessionExpiredOn
        };
        const response = response_1.ResponseData.default;
        response.data = responseData;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.loginAdmin = loginAdmin;
