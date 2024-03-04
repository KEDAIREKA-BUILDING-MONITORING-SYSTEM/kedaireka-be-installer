"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDetailRoom = exports.findAllRooms = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const pagination_1 = require("../../utilities/pagination");
const log_1 = require("../../utilities/log");
const rooms_1 = require("../../models/rooms");
const requestCheker_1 = require("../../utilities/requestCheker");
const buildings_1 = require("../../models/buildings");
const floor_1 = require("../../models/floor");
const findAllRooms = async (req, res) => {
    try {
        const page = new pagination_1.Pagination(parseInt(req.query.page) ?? 0, parseInt(req.query.size) ?? 10);
        const result = await rooms_1.RoomsModel.findAndCountAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                ...(Boolean(req.query.search) && {
                    [sequelize_1.Op.or]: [{ roomName: { [sequelize_1.Op.like]: `%${req.query.search}%` } }]
                }),
                ...(Boolean(req.query.buildingId) && {
                    roomBuildingId: { [sequelize_1.Op.eq]: req.query.buildingId }
                }),
                ...(Boolean(req.query.floorId) && {
                    roomFloorId: { [sequelize_1.Op.eq]: req.query.floorId }
                })
            },
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
exports.findAllRooms = findAllRooms;
const findDetailRoom = async (req, res) => {
    const requestParams = req.params;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['roomBuildingId'],
        requestData: requestParams
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
                roomBuildingId: { [sequelize_1.Op.eq]: requestParams.roomBuildingId }
            },
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
                }
            ]
        });
        if (room == null) {
            const message = 'room not found!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        const response = response_1.ResponseData.default;
        response.data = room;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.findDetailRoom = findDetailRoom;
