"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allCurrentConsumption = exports.totalCurrentConsumption = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const devicePortLogs_1 = require("../../models/devicePortLogs");
const pagination_1 = require("../../utilities/pagination");
const moment_1 = __importDefault(require("moment"));
const totalCurrentConsumption = async (req, res) => {
    try {
        const response = response_1.ResponseData.default;
        const current = await devicePortLogs_1.DevicePortLogsModel.findAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                devicePortLogName: { [sequelize_1.Op.eq]: 'ARUS' }
            }
        });
        let totalCurrent = 0;
        current.forEach((value) => {
            totalCurrent += value.devicePortLogValue;
        });
        response.data = totalCurrent;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.totalCurrentConsumption = totalCurrentConsumption;
const allCurrentConsumption = async (req, res) => {
    try {
        const page = new pagination_1.Pagination(parseInt(req.query.page) ?? 0, parseInt(req.query.size) ?? 10);
        const TODAY_START = (0, moment_1.default)().startOf('day').toDate();
        const TODAY_END = (0, moment_1.default)().endOf('day').toDate();
        const WEEK_START = (0, moment_1.default)().startOf('week').toDate();
        const WEEK_END = (0, moment_1.default)().endOf('week').toDate();
        const MONTH_START = (0, moment_1.default)().startOf('month').toDate();
        const MONTH_END = (0, moment_1.default)().endOf('month').toDate();
        const YEAR_START = (0, moment_1.default)().startOf('year').toDate();
        const YEAR_END = (0, moment_1.default)().endOf('year').toDate();
        const YESTERDAY = (0, moment_1.default)().clone().subtract(1, 'day');
        const YESTERDAY_START = YESTERDAY.startOf('day').toDate();
        const YESTERDAY_END = YESTERDAY.endOf('day').toDate();
        const result = await devicePortLogs_1.DevicePortLogsModel.findAndCountAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                devicePortLogName: { [sequelize_1.Op.eq]: 'ARUS' },
                ...(req.query.range === 'today' && {
                    createdAt: { [sequelize_1.Op.between]: [TODAY_START, TODAY_END] }
                }),
                ...(req.query.range === 'yesterday' && {
                    createdAt: {
                        [sequelize_1.Op.between]: [YESTERDAY_START, YESTERDAY_END]
                    }
                }),
                ...(req.query.range === 'week' && {
                    createdAt: { [sequelize_1.Op.between]: [WEEK_START, WEEK_END] }
                }),
                ...(req.query.range === 'month' && {
                    createdAt: { [sequelize_1.Op.between]: [MONTH_START, MONTH_END] }
                }),
                ...(req.query.range === 'year' && {
                    createdAt: { [sequelize_1.Op.between]: [YEAR_START, YEAR_END] }
                }),
                ...(Boolean(req.query.search) && {
                    [sequelize_1.Op.or]: [{ reportMessage: { [sequelize_1.Op.like]: `%${req.query.search}%` } }]
                }),
                ...(Boolean(req.query.httpStatusCode) && {
                    [sequelize_1.Op.or]: [
                        { reportHttpStatusCode: { [sequelize_1.Op.like]: `%${req.query.httpStatusCode}%` } }
                    ]
                })
            },
            // order: [['id', 'desc']],
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
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.allCurrentConsumption = allCurrentConsumption;
