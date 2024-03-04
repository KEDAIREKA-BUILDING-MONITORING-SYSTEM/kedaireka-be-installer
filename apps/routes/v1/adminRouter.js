"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../../middlewares");
const admin_1 = require("../../controllers/admin");
const adminRouter = (app) => {
    const router = express_1.default.Router();
    app.use('/api/v1/admin', middlewares_1.middleware.useAuthorization, router);
    router.get('/', async (req, res) => await admin_1.adminController.findAll(req, res));
    router.get('/detail/:adminId', async (req, res) => await admin_1.adminController.find(req, res));
    router.post('/login', async (req, res) => await admin_1.adminController.login(req, res));
    router.post('/', async (req, res) => await admin_1.adminController.create(req, res));
    router.patch('/', async (req, res) => await admin_1.adminController.update(req, res));
    router.delete('/', async (req, res) => await admin_1.adminController.remove(req, res));
};
exports.adminRouter = adminRouter;
