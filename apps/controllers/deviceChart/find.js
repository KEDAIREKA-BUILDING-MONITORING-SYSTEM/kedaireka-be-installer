"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOneDevicePortLogs = exports.findAllDeviceChart = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const pagination_1 = require("../../utilities/pagination");
const requestCheker_1 = require("../../utilities/requestCheker");
const log_1 = require("../../utilities/log");
const devicePortLogs_1 = require("../../models/devicePortLogs");
const devicePorts_1 = require("../../models/devicePorts");
const findAllDeviceChart = async (req, res) => {
    try {
        const page = new pagination_1.Pagination(parseInt(req.query.page) ?? 0, parseInt(req.query.size) ?? 10);
        const devicePorts = await devicePorts_1.DevicePortsModel.findAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                devicePortDeviceId: { [sequelize_1.Op.eq]: req.params.deviceId }
            },
            order: [['id', 'desc']],
            ...(req.query.pagination === 'true' && {
                limit: 10,
                offset: page.offset
            })
        });
        const devicePortLogs = await devicePortLogs_1.DevicePortLogsModel.findAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                devicePortLogDeviceId: { [sequelize_1.Op.eq]: req.params.deviceId }
            },
            order: [['id', 'desc']],
            limit: 15,
            offset: 0
        });
        const devicePortLog1 = devicePortLogs
            .filter((port) => port.devicePortLogPortNumber === 1)
            .map((item) => item.devicePortLogValue);
        const devicePortLogTimeStamp1 = devicePortLogs
            .filter((port) => port.devicePortLogPortNumber === 1)
            .map((item) => item.createdAt);
        const devicePortLog2 = devicePortLogs
            .filter((port) => port.devicePortLogPortNumber === 2)
            .map((item) => item.devicePortLogValue);
        const devicePortLogTimeStamp2 = devicePortLogs
            .filter((port) => port.devicePortLogPortNumber === 2)
            .map((item) => item.createdAt);
        const devicePortLog3 = devicePortLogs
            .filter((port) => port.devicePortLogPortNumber === 3)
            .map((item) => item.devicePortLogValue);
        const devicePortLogTimeStamp3 = devicePortLogs
            .filter((port) => port.devicePortLogPortNumber === 3)
            .map((item) => item.createdAt);
        const devicePortLog4 = devicePortLogs
            .filter((port) => port.devicePortLogPortNumber === 4)
            .map((item) => item.devicePortLogValue);
        const devicePortLogTimeStamp4 = devicePortLogs
            .filter((port) => port.devicePortLogPortNumber === 4)
            .map((item) => item.createdAt);
        const data = devicePorts.map((device) => {
            if (device.devicePortNumber === 1) {
                return {
                    ...device.dataValues,
                    deviceLogs: devicePortLog1,
                    timeStamp: devicePortLogTimeStamp1
                };
            }
            if (device.devicePortNumber === 2) {
                return {
                    ...device.dataValues,
                    deviceLogs: devicePortLog2,
                    timeStamp: devicePortLogTimeStamp2
                };
            }
            if (device.devicePortNumber === 3) {
                return {
                    ...device.dataValues,
                    deviceLogs: devicePortLog3,
                    timeStamp: devicePortLogTimeStamp3
                };
            }
            if (device.devicePortNumber === 4) {
                return {
                    ...device.dataValues,
                    deviceLogs: devicePortLog4,
                    timeStamp: devicePortLogTimeStamp4
                };
            }
            return device;
        });
        const response = response_1.ResponseData.default;
        response.data = data;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        log_1.CONSOLE.error(error.message);
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.findAllDeviceChart = findAllDeviceChart;
const findOneDevicePortLogs = async (req, res) => {
    const requestParams = req.params;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['devicePortLogId'],
        requestData: requestParams
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const result = await devicePortLogs_1.DevicePortLogsModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                devicePortLogId: { [sequelize_1.Op.eq]: requestParams.devicePortLogId }
            },
            attributes: ['createdAt', 'deviceLogId', 'deviceLogDeviceId', 'deviceLogValue']
        });
        if (result === null) {
            const message = 'not found!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        const response = response_1.ResponseData.default;
        response.data = result;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.findOneDevicePortLogs = findOneDevicePortLogs;
