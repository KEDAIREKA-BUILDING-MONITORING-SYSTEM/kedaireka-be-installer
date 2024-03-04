"use strict";
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statisticRouter = void 0;
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../../middlewares");
const statistic_1 = require("../../controllers/statistic");
const statisticRouter = (app) => {
    const router = express_1.default.Router();
    app.use('/api/v1/statistic', middlewares_1.middleware.useAuthorization, router);
    router.get('/', async (req, res) => await statistic_1.statisticController.findAll(req, res));
    router.get('/current-consumption/total', async (req, res) => await statistic_1.statisticController.totalCurrentConsumption(req, res));
    router.get('/current-consumption/list', async (req, res) => await statistic_1.statisticController.allCurrentConsumption(req, res));
};
exports.statisticRouter = statisticRouter;
