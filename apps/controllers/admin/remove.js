"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAdmin = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const admin_1 = require("../../models/admin");
const requestCheker_1 = require("../../utilities/requestCheker");
const checkAuth_1 = require("../../utilities/checkAuth");
const removeAdmin = async (req, res) => {
    const requestQuery = req.query;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['adminId'],
        requestData: req.query
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const checkIsSuperAdmin = await (0, checkAuth_1.isSuperAdmin)({
            adminId: req.body?.user?.userId
        });
        if (checkIsSuperAdmin) {
            const message = 'access denied!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response);
        }
        const result = await admin_1.AdminModel.update({ deleted: 1 }, {
            where: { adminId: { [sequelize_1.Op.eq]: requestQuery.adminId } }
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json(result);
    }
    catch (error) {
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.removeAdmin = removeAdmin;
