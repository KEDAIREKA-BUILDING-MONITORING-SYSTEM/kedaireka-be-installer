"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devicePortController = void 0;
const create_1 = require("./create");
const find_1 = require("./find");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.devicePortController = {
    findAll: find_1.findAllDevicePort,
    findDetial: find_1.findDetailDevicePort,
    create: create_1.createDevicePort,
    update: update_1.updateDevicePort,
    remove: remove_1.removeDevicePort
};
