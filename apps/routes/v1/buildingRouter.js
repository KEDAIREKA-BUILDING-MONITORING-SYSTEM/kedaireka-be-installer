"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildingRouter = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const express_1 = __importDefault(require("express"));
const buildings_1 = require("../../controllers/buildings");
const buildingRouter = (app) => {
    const route = express_1.default.Router();
    app.use('/api/v1/buildings', route);
    route.get('/', async (req, res) => await buildings_1.buildingController.findAll(req, res));
    route.get('/detail/:buildingId', async (req, res) => await buildings_1.buildingController.findDetail(req, res));
    route.post('/', async (req, res) => await buildings_1.buildingController.create(req, res));
    route.patch('/', async (req, res) => await buildings_1.buildingController.update(req, res));
    route.delete('/', async (req, res) => await buildings_1.buildingController.remove(req, res));
};
exports.buildingRouter = buildingRouter;
