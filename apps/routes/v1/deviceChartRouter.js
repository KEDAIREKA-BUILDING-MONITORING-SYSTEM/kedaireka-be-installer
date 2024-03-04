"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceChartRouter = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const express_1 = __importDefault(require("express"));
const deviceChart_1 = require("../../controllers/deviceChart");
const deviceChartRouter = (app) => {
    const route = express_1.default.Router();
    app.use('/api/v1/', route);
    route.get('/devices/charts/:deviceId', async (req, res) => await deviceChart_1.deviceChartController.findAll(req, res));
};
exports.deviceChartRouter = deviceChartRouter;
