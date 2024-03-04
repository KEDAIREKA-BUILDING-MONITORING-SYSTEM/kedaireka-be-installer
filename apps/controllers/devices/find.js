"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOneDevice = exports.findAllDevice = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const pagination_1 = require("../../utilities/pagination");
const requestCheker_1 = require("../../utilities/requestCheker");
const log_1 = require("../../utilities/log");
const devices_1 = require("../../models/devices");
const devicePortLogs_1 = require("../../models/devicePortLogs");
const devicePorts_1 = require("../../models/devicePorts");
const buildings_1 = require("../../models/buildings");
const rooms_1 = require("../../models/rooms");
const floor_1 = require("../../models/floor");
const findAllDevice = async (req, res) => {
    try {
        const page = new pagination_1.Pagination(parseInt(req.query.page) ?? 0, parseInt(req.query.size) ?? 10);
        const result = await devices_1.DeviceModel.findAndCountAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                ...(Boolean(req.query.search) && {
                    [sequelize_1.Op.or]: [{ deviceName: { [sequelize_1.Op.like]: `%${req.query.search}%` } }]
                }),
                ...(Boolean(req.query.deviceStatus) && {
                    deviceStatus: { [sequelize_1.Op.eq]: req.query.deviceStatus }
                }),
                ...(Boolean(req.query.deviceFloor) && {
                    deviceFloor: { [sequelize_1.Op.eq]: parseInt(req.query.deviceFloor) }
                }),
                ...(Boolean(req.query.deviceRoomId) && {
                    deviceRoomId: { [sequelize_1.Op.eq]: req.query.deviceRoomId }
                }),
                ...(Boolean(req.query.deviceBuildingId) && {
                    deviceBuildingId: { [sequelize_1.Op.eq]: req.query.deviceBuildingId }
                })
            },
            attributes: [
                'id',
                'createdAt',
                'updatedAt',
                'deviceStatus',
                'deviceId',
                'deviceName',
                'deviceToken'
            ],
            include: [
                {
                    model: buildings_1.BuildingsModel,
                    as: 'building',
                    attributes: ['buildingId', 'buildingName']
                },
                {
                    model: floor_1.FloorsModel,
                    as: 'floor',
                    attributes: ['floorId', 'floorName']
                },
                {
                    model: rooms_1.RoomsModel,
                    as: 'room',
                    attributes: ['roomId', 'roomName']
                }
            ],
            order: [['id', 'desc']],
            ...(req.query.pagination === 'true' && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.default;
        response.data = page.data(result);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        log_1.CONSOLE.error(error.message);
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.findAllDevice = findAllDevice;
const findOneDevice = async (req, res) => {
    const requestParams = req.params;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['deviceId'],
        requestData: requestParams
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const result = await devices_1.DeviceModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                deviceId: { [sequelize_1.Op.eq]: requestParams.deviceId }
            },
            include: [
                {
                    model: devicePortLogs_1.DevicePortLogsModel,
                    attributes: [
                        'createdAt',
                        'devicePortLogId',
                        'devicePortLogDeviceId',
                        'devicePortLogValue',
                        'devicePortLogName',
                        'devicePortLogPortNumber'
                    ],
                    as: 'devicePortLogs'
                },
                {
                    model: devicePorts_1.DevicePortsModel,
                    attributes: [
                        'createdAt',
                        'devicePortId',
                        'devicePortDeviceId',
                        'devicePortName',
                        'devicePortCategory',
                        'devicePortNumber',
                        'devicePortStatus'
                    ],
                    as: 'devicePorts'
                },
                {
                    model: buildings_1.BuildingsModel,
                    as: 'building',
                    attributes: ['buildingId', 'buildingName']
                },
                {
                    model: rooms_1.RoomsModel,
                    as: 'room',
                    attributes: ['roomId', 'roomName']
                }
            ]
        });
        if (result == null) {
            const message = 'device not found!';
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
exports.findOneDevice = findOneDevice;
