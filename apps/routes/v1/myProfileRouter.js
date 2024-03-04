"use strict";
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myProfileRouter = void 0;
const express_1 = __importDefault(require("express"));
const my_profile_1 = require("../../controllers/my-profile");
const middlewares_1 = require("../../middlewares");
const myProfileRouter = (app) => {
    const router = express_1.default.Router();
    app.use('/api/v1/my-profile', router);
    router.get('/', middlewares_1.middleware.useAuthorization, async (req, res) => await my_profile_1.myProfileController.find(req, res));
    router.patch('/', middlewares_1.middleware.useAuthorization, async (req, res) => await my_profile_1.myProfileController.update(req, res));
    router.post('/login', async (req, res) => await my_profile_1.myProfileController.login(req, res));
};
exports.myProfileRouter = myProfileRouter;
