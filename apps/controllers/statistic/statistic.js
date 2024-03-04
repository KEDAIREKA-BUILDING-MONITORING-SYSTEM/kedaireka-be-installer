"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statistic = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const devices_1 = require("../../models/devices");
const buildings_1 = require("../../models/buildings");
const statistic = async (req, res) => {
    try {
        const totalBuilding = await buildings_1.BuildingsModel.count({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 }
            }
        });
        const totalDevice = await devices_1.DeviceModel.count({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 }
            }
        });
        const totalActiveDevice = await devices_1.DeviceModel.count({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                deviceStatus: { [sequelize_1.Op.eq]: 'active' }
            }
        });
        const totalStandByDevice = await devices_1.DeviceModel.count({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                deviceStatus: { [sequelize_1.Op.eq]: 'standBy' }
            }
        });
        const totalInactiveDevice = await devices_1.DeviceModel.count({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                deviceStatus: { [sequelize_1.Op.eq]: 'inactive' }
            }
        });
        const response = response_1.ResponseData.default;
        response.data = {
            totalBuilding,
            totalDevice,
            totalActiveDevice,
            totalStandByDevice,
            totalInactiveDevice
        };
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.statistic = statistic;
