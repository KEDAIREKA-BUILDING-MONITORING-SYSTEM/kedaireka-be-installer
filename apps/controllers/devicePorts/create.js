"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDevicePort = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestCheker_1 = require("../../utilities/requestCheker");
const uuid_1 = require("uuid");
const devicePorts_1 = require("../../models/devicePorts");
const sequelize_1 = require("sequelize");
const createDevicePort = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: [
            'devicePortDeviceId',
            'devicePortName',
            'devicePortCategory',
            'devicePortNumber',
            'devicePortStatus'
        ],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const device = await devicePorts_1.DevicePortsModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                devicePortDeviceId: { [sequelize_1.Op.eq]: requestBody.devicePortDeviceId },
                devicePortNumber: { [sequelize_1.Op.eq]: requestBody.devicePortNumber }
            },
            attributes: ['devicePortNumber', 'devicePortStatus']
        });
        if (device !== null) {
            const message = 'device port already used!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
        }
        requestBody.devicePortId = (0, uuid_1.v4)();
        await devicePorts_1.DevicePortsModel.create(requestBody);
        const response = response_1.ResponseData.default;
        const result = { message: 'success' };
        response.data = result;
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (error) {
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.createDevicePort = createDevicePort;
