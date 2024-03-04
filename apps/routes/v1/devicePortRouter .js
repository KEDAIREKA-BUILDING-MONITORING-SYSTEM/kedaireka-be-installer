"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.devicePortRouter = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const express_1 = __importDefault(require("express"));
const devicePorts_1 = require("../../controllers/devicePorts");
const devicePortRouter = (app) => {
    const route = express_1.default.Router();
    app.use('/api/v1/devices/ports', route);
    route.get('/', async (req, res) => await devicePorts_1.devicePortController.findAll(req, res));
    route.get('/detail/:devicePortId', async (req, res) => await devicePorts_1.devicePortController.findDetial(req, res));
    route.post('/', async (req, res) => await devicePorts_1.devicePortController.create(req, res));
    route.patch('/', async (req, res) => await devicePorts_1.devicePortController.update(req, res));
    route.delete('/', async (req, res) => await devicePorts_1.devicePortController.remove(req, res));
};
exports.devicePortRouter = devicePortRouter;
