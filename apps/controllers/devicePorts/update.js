"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDevicePort = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestCheker_1 = require("../../utilities/requestCheker");
const devicePorts_1 = require("../../models/devicePorts");
const sequelize_1 = require("sequelize");
const updateDevicePort = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['devicePortId'],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const port = await devicePorts_1.DevicePortsModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                devicePortId: { [sequelize_1.Op.eq]: requestBody.devicePortId }
            }
        });
        if (port === null) {
            const message = 'device port not found!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
        }
        const newData = {
            ...(requestBody.devicePortName?.length > 0 && {
                devicePortName: requestBody.devicePortName
            }),
            ...(requestBody.devicePortCategory?.length > 0 && {
                devicePortCategory: requestBody.devicePortCategory
            }),
            ...(requestBody.devicePortNumber !== null && {
                devicePortNumber: requestBody.devicePortNumber
            }),
            ...(requestBody.devicePortStatus !== null && {
                devicePortStatus: requestBody.devicePortStatus
            })
        };
        await devicePorts_1.DevicePortsModel.update(newData, {
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                devicePortId: { [sequelize_1.Op.eq]: requestBody.devicePortId }
            }
        });
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
exports.updateDevicePort = updateDevicePort;
