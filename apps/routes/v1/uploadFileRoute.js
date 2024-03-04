"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileRoutes = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const express_1 = __importDefault(require("express"));
const upload_file_1 = require("../../controllers/upload-file");
const upload_file_2 = require("../../middlewares/upload-file");
const http_status_codes_1 = require("http-status-codes");
const configs_1 = require("../../configs");
const response_1 = require("../../utilities/response");
const checkFileSizeMidleWare = (req, res, next) => {
    try {
        if (req.file != null) {
            const fileSizeInKiloBytes = req.file.size / 1024;
            if (fileSizeInKiloBytes > +configs_1.CONFIG.maximumUploadFile) {
                throw Error('maksimum file 2mb');
            }
            next();
        }
    }
    catch (error) {
        const message = 'maksimum file 2mb';
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response);
    }
};
const uploadFileRoutes = (app) => {
    const route = express_1.default.Router();
    app.use('/upload-file', route);
    route.post('/', checkFileSizeMidleWare, upload_file_2.uploadMidleWare.single('file'), async (req, res) => await (0, upload_file_1.uploadFile)(req, res));
};
exports.uploadFileRoutes = uploadFileRoutes;
