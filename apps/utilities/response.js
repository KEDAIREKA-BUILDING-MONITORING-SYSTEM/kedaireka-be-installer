"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseData = void 0;
/* eslint-disable @typescript-eslint/consistent-type-assertions */
const configs_1 = require("../configs");
const log_1 = require("./log");
exports.ResponseData = {
    error: (message) => {
        log_1.CONSOLE.error(message);
        return {
            request_param: '',
            status: 'error',
            error_message: message,
            data: null,
            next: '',
            version: { code: configs_1.CONFIG.appVersion, name: configs_1.CONFIG.appSemantic }
        };
    },
    default: {
        request_param: '',
        status: 'success',
        error_message: null,
        data: '',
        next: '',
        version: { code: configs_1.CONFIG.appVersion, name: configs_1.CONFIG.appSemantic }
    }
};
