"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importLayout = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../../utilities/response");
const buildings_1 = require("../../../models/buildings");
const importLayout = async (req, res) => {
    try {
        console.log(req.body);
        const building = checkBuildingJsonFormat(req.body);
        await buildings_1.BuildingsModel.bulkCreate(building);
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
exports.importLayout = importLayout;
const checkBuildingJsonFormat = (layout) => {
    try {
        const buildings = layout.map((item) => {
            return {
                buildingId: item.buildingId,
                buildingName: item.buildingName
            };
        });
        return buildings;
    }
    catch (error) {
        throw Error("json format for building doesn't support");
    }
};
