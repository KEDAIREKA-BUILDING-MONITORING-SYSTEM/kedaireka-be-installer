"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBuilding = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestCheker_1 = require("../../utilities/requestCheker");
const sequelize_1 = require("sequelize");
const buildings_1 = require("../../models/buildings");
const updateBuilding = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['buildingId'],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const building = await buildings_1.BuildingsModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                buildingId: { [sequelize_1.Op.eq]: requestBody.buildingId }
            }
        });
        if (building === null) {
            const message = 'building not found!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
        }
        const newData = {
            ...(requestBody.buildingName?.length > 0 && {
                buildingName: requestBody.buildingName
            })
        };
        await buildings_1.BuildingsModel.update(newData, {
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                buildingId: { [sequelize_1.Op.eq]: requestBody.buildingId }
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
exports.updateBuilding = updateBuilding;
