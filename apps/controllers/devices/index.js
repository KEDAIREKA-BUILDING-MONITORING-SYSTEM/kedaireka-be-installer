"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceController = void 0;
const create_1 = require("./create");
const find_1 = require("./find");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.deviceController = {
    create: create_1.createDevice,
    findAll: find_1.findAllDevice,
    findOne: find_1.findOneDevice,
    remove: remove_1.removeDevice,
    update: update_1.updateDevice,
    updateToken: update_1.updateDeviceToken
};
