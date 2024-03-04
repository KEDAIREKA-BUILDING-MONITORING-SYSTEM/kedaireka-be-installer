"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDevicePortLog = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const devices_1 = require("../../models/devices");
const uuid_1 = require("uuid");
const devicePortLogs_1 = require("../../models/devicePortLogs");
const sequelize_1 = require("sequelize");
const requestCheker_1 = require("../../utilities/requestCheker");
const devicePorts_1 = require("../../models/devicePorts");
const reports_1 = require("../../models/reports");
const createDevicePortLog = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: [
            'devicePortLogValue',
            'devicePortLogPortNumber',
            'devicePortLogCategory',
            'x-device-token'
        ],
        requestData: { ...requestBody, ...req.headers }
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    console.log(requestBody);
    try {
        const device = await devices_1.DeviceModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                deviceToken: { [sequelize_1.Op.eq]: req.header('x-device-token') }
            }
        });
        if (device === null) {
            const message = 'device not found!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        const devicePort = await devicePorts_1.DevicePortsModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                devicePortNumber: requestBody.devicePortLogPortNumber,
                devicePortDeviceId: device.deviceId,
                devicePortCategory: requestBody.devicePortLogCategory
            },
            attributes: ['devicePortCategory', 'devicePortNumber', 'devicePortStatus']
        });
        if (devicePort === null) {
            const message = `device port ${requestBody.devicePortLogPortNumber} mismatch`;
            const reportPayload = {
                reportId: (0, uuid_1.v4)(),
                reportMessage: message,
                reportHttpStatusCode: 403
            };
            await reports_1.ReportModel.create(reportPayload);
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        if (devicePort.devicePortStatus) {
            requestBody.devicePortLogCategory = devicePort.devicePortCategory;
            requestBody.devicePortLogName = devicePort.devicePortName;
            requestBody.devicePortLogDeviceId = device.deviceId;
            requestBody.devicePortLogId = (0, uuid_1.v4)();
            await devicePortLogs_1.DevicePortLogsModel.create(requestBody);
        }
        const response = response_1.ResponseData.default;
        response.data = { message: 'success' };
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (error) {
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.createDevicePortLog = createDevicePortLog;
