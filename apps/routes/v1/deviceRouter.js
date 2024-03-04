"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceRouter = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const express_1 = __importDefault(require("express"));
const devices_1 = require("../../controllers/devices");
const deviceRouter = (app) => {
    const route = express_1.default.Router();
    app.use('/api/v1/devices', route);
    route.get('/', async (req, res) => await devices_1.deviceController.findAll(req, res));
    route.get('/detail/:deviceId', async (req, res) => await devices_1.deviceController.findOne(req, res));
    route.post('/', async (req, res) => await devices_1.deviceController.create(req, res));
    route.patch('/', async (req, res) => await devices_1.deviceController.update(req, res));
    route.patch('/token', async (req, res) => await devices_1.deviceController.updateToken(req, res));
    route.delete('/', async (req, res) => await devices_1.deviceController.remove(req, res));
};
exports.deviceRouter = deviceRouter;
