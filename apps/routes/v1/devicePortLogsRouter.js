"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.devicePortLogRouter = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const express_1 = __importDefault(require("express"));
const devicePortLogs_1 = require("../../controllers/devicePortLogs");
const devicePortLogRouter = (app) => {
    const route = express_1.default.Router();
    app.use('/api/v1/', route);
    route.get('/devices/ports/logs', async (req, res) => await devicePortLogs_1.devicePortLogsController.findAll(req, res));
    route.post('/devices/port/logs', async (req, res) => await devicePortLogs_1.devicePortLogsController.create(req, res));
};
exports.devicePortLogRouter = devicePortLogRouter;
