"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastRouter = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const express_1 = __importDefault(require("express"));
const broadcast_1 = require("../../controllers/broadcast");
const broadcastRouter = (app) => {
    const route = express_1.default.Router();
    app.use('/api/v1/broadcast', route);
    route.get('/', async (req, res) => await broadcast_1.broadcastController.findAll(req, res));
    route.get('/detail/:buildingId', async (req, res) => await broadcast_1.broadcastController.findDetail(req, res));
    route.post('/', async (req, res) => await broadcast_1.broadcastController.create(req, res));
    route.patch('/', async (req, res) => await broadcast_1.broadcastController.update(req, res));
    route.delete('/', async (req, res) => await broadcast_1.broadcastController.remove(req, res));
};
exports.broadcastRouter = broadcastRouter;
