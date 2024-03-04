"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingRouter = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const express_1 = __importDefault(require("express"));
const settings_1 = require("../../controllers/settings");
const settingRouter = (app) => {
    const route = express_1.default.Router();
    app.use('/api/v1/settings', route);
    route.get('/', async (req, res) => await settings_1.settingController.findAll(req, res));
    route.get('/detail/:buildingId', async (req, res) => await settings_1.settingController.findDetail(req, res));
    route.post('/', async (req, res) => await settings_1.settingController.create(req, res));
    route.patch('/', async (req, res) => await settings_1.settingController.update(req, res));
    route.delete('/', async (req, res) => await settings_1.settingController.remove(req, res));
};
exports.settingRouter = settingRouter;
