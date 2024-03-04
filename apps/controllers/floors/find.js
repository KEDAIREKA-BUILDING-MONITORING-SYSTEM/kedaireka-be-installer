"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDetailFloor = exports.findAllFloor = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const pagination_1 = require("../../utilities/pagination");
const log_1 = require("../../utilities/log");
const requestCheker_1 = require("../../utilities/requestCheker");
const buildings_1 = require("../../models/buildings");
const floor_1 = require("../../models/floor");
const findAllFloor = async (req, res) => {
    try {
        const page = new pagination_1.Pagination(parseInt(req.query.page) ?? 0, parseInt(req.query.size) ?? 10);
        console.log(req.query);
        const result = await floor_1.FloorsModel.findAndCountAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                ...(Boolean(req.query.search) && {
                    [sequelize_1.Op.or]: [{ floorName: { [sequelize_1.Op.like]: `%${req.query.search}%` } }]
                }),
                ...(Boolean(req.query.buildingId) && {
                    floorBuildingId: { [sequelize_1.Op.eq]: req.query.buildingId }
                })
            },
            include: [
                {
                    model: buildings_1.BuildingsModel,
                    as: 'building',
                    attributes: ['buildingId', 'buildingName']
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
exports.findAllFloor = findAllFloor;
const findDetailFloor = async (req, res) => {
    const requestParams = req.params;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['floorId'],
        requestData: requestParams
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const room = await floor_1.FloorsModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                floorId: { [sequelize_1.Op.eq]: requestParams.floorId }
            },
            include: [
                {
                    model: buildings_1.BuildingsModel,
                    as: 'building',
                    attributes: ['buildingId', 'buildingName']
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
exports.findDetailFloor = findDetailFloor;
