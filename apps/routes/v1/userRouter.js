"use strict";
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("../../controllers/users");
const middlewares_1 = require("../../middlewares");
const userRoutes = (app) => {
    const router = express_1.default.Router();
    app.use('/api/v1/users', router);
    router.get('/', middlewares_1.middleware.useAuthorization, async (req, res) => await users_1.UsersController.findAll(req, res));
    router.get('/detail/:userId', middlewares_1.middleware.useAuthorization, async (req, res) => await users_1.UsersController.findOne(req, res));
    router.patch('/', async (req, res) => await users_1.UsersController.update(req, res));
    router.delete('/', async (req, res) => await users_1.UsersController.remove(req, res));
    router.post('/login', async (req, res) => await users_1.UsersController.login(req, res));
    router.post('/register', async (req, res) => await users_1.UsersController.register(req, res));
};
exports.userRoutes = userRoutes;
