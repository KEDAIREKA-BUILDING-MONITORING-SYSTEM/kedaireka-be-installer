"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomRouter = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const express_1 = __importDefault(require("express"));
const rooms_1 = require("../../controllers/rooms");
const roomRouter = (app) => {
    const route = express_1.default.Router();
    app.use('/api/v1/rooms', route);
    route.get('/', async (req, res) => await rooms_1.roomController.findAll(req, res));
    route.get('/detail/:roomBuildingId', async (req, res) => await rooms_1.roomController.findDetail(req, res));
    route.post('/', async (req, res) => await rooms_1.roomController.create(req, res));
    route.patch('/', async (req, res) => await rooms_1.roomController.update(req, res));
    route.delete('/', async (req, res) => await rooms_1.roomController.remove(req, res));
};
exports.roomRouter = roomRouter;
