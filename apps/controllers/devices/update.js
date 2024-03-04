"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDeviceToken = exports.updateDevice = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const requestCheker_1 = require("../../utilities/requestCheker");
const devices_1 = require("../../models/devices");
const uuid_1 = require("uuid");
const updateDevice = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['deviceId'],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const device = await devices_1.DeviceModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                deviceId: { [sequelize_1.Op.eq]: requestBody.deviceId }
            }
        });
        if (device == null) {
            const message = 'device not found!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        const newData = {
            ...(requestBody.deviceName?.length > 0 && {
                deviceName: requestBody.deviceName
            }),
            ...(requestBody.deviceRoomId?.length > 0 && {
                deviceRoomId: requestBody.deviceRoomId
            }),
            ...(requestBody.deviceBuildingId?.length > 0 && {
                deviceBuildingId: requestBody.deviceBuildingId
            }),
            ...(requestBody.deviceFloorId?.length > 0 && {
                deviceFloor: requestBody.deviceFloorId
            }),
            ...(requestBody.deviceStatus?.length > 0 && {
                deviceStatus: requestBody.deviceStatus
            })
        };
        await devices_1.DeviceModel.update(newData, {
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                deviceId: { [sequelize_1.Op.eq]: requestBody.deviceId }
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
exports.updateDevice = updateDevice;
const updateDeviceToken = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['deviceId'],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const device = await devices_1.DeviceModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                deviceId: { [sequelize_1.Op.eq]: requestBody.deviceId }
            }
        });
        if (device == null) {
            const message = 'not found!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        device.deviceToken = (0, uuid_1.v4)();
        void device.save();
        const response = response_1.ResponseData.default;
        response.data = { token: device.deviceToken };
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.updateDeviceToken = updateDeviceToken;
