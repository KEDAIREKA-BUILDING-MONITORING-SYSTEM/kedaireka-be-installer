"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportRouter = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const express_1 = __importDefault(require("express"));
const reports_1 = require("../../controllers/reports");
const reportRouter = (app) => {
    const route = express_1.default.Router();
    app.use('/api/v1/reports', route);
    route.get('/', async (req, res) => await reports_1.reportController.findAll(req, res));
    route.get('/detail/:reportId', async (req, res) => await reports_1.reportController.findDetail(req, res));
    route.post('/', async (req, res) => await reports_1.reportController.create(req, res));
    route.delete('/', async (req, res) => await reports_1.reportController.remove(req, res));
};
exports.reportRouter = reportRouter;
