"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.floorRouter = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const express_1 = __importDefault(require("express"));
const floors_1 = require("../../controllers/floors");
const floorRouter = (app) => {
    const route = express_1.default.Router();
    app.use('/api/v1/floors', route);
    route.get('/', async (req, res) => await floors_1.floorController.findAll(req, res));
    route.get('/detail/:floorId', async (req, res) => await floors_1.floorController.findDetail(req, res));
    route.post('/', async (req, res) => await floors_1.floorController.create(req, res));
    route.patch('/', async (req, res) => await floors_1.floorController.update(req, res));
    route.delete('/', async (req, res) => await floors_1.floorController.remove(req, res));
};
exports.floorRouter = floorRouter;
