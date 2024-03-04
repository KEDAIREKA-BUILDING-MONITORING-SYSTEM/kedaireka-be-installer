"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../utilities/response");
const index = async (req, res) => {
    try {
        const data = {
            about_me: 'Welcome to Kedaireka API V1'
        };
        const response = response_1.ResponseData.default;
        response.data = data;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.index = index;
