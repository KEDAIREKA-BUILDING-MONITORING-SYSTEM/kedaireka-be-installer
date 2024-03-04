"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.layoutRouter = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const express_1 = __importDefault(require("express"));
const import_1 = require("../../controllers/layout/import");
const layoutRouter = (app) => {
    const route = express_1.default.Router();
    app.use('/api/v1/layouts', route);
    route.post('/import', async (req, res) => await import_1.importLayoutController.import(req, res));
};
exports.layoutRouter = layoutRouter;
