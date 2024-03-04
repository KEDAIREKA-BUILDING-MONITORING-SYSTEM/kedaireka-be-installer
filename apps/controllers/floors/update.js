"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFLoor = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestCheker_1 = require("../../utilities/requestCheker");
const sequelize_1 = require("sequelize");
const floor_1 = require("../../models/floor");
const updateFLoor = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['floorId'],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const floor = await floor_1.FloorsModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                floorId: { [sequelize_1.Op.eq]: requestBody.floorId }
            }
        });
        if (floor === null) {
            const message = 'room not found!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
        }
        const newData = {
            ...(requestBody.floorName?.length > 0 && {
                floorName: requestBody.floorName
            }),
            ...(requestBody.floorBuildingId?.length > 0 && {
                floorBuildingId: requestBody.floorBuildingId
            })
        };
        await floor_1.FloorsModel.update(newData, {
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                floorId: { [sequelize_1.Op.eq]: requestBody.floorId }
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
exports.updateFLoor = updateFLoor;
