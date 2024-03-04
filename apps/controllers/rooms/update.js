"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoom = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestCheker_1 = require("../../utilities/requestCheker");
const sequelize_1 = require("sequelize");
const rooms_1 = require("../../models/rooms");
const updateRoom = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['roomId'],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const room = await rooms_1.RoomsModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                roomId: { [sequelize_1.Op.eq]: requestBody.roomId }
            }
        });
        if (room === null) {
            const message = 'room not found!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
        }
        const newData = {
            ...(requestBody.roomName?.length > 0 && {
                roomName: requestBody.roomName
            }),
            ...(requestBody.roomId?.length > 0 && {
                roomId: requestBody.roomId
            }),
            ...(requestBody.roomBuildingId?.length > 0 && {
                roomBuildingId: requestBody.roomBuildingId
            })
        };
        await rooms_1.RoomsModel.update(newData, {
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                roomId: { [sequelize_1.Op.eq]: requestBody.roomId }
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
exports.updateRoom = updateRoom;
