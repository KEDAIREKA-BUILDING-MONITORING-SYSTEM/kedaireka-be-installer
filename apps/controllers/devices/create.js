"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDevice = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const devices_1 = require("../../models/devices");
const requestCheker_1 = require("../../utilities/requestCheker");
const uuid_1 = require("uuid");
const createDevice = async (req, res) => {
    const requestBody = req.body;
    console.log(requestBody);
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: [
            'deviceName',
            'deviceBuildingId',
            'deviceRoomId',
            'deviceFloorId',
            'deviceStatus'
        ],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        requestBody.deviceId = (0, uuid_1.v4)();
        requestBody.deviceToken = (0, uuid_1.v4)();
        await devices_1.DeviceModel.create(requestBody);
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
exports.createDevice = createDevice;
