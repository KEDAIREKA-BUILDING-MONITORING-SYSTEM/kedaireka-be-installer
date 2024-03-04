"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devicePortLogsController = void 0;
const create_1 = require("./create");
const find_1 = require("./find");
exports.devicePortLogsController = {
    findAll: find_1.findAllDevicePortLogs,
    find: find_1.findOneDevicePortLogs,
    create: create_1.createDevicePortLog
};
