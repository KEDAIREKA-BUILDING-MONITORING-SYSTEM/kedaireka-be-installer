"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.floorController = void 0;
const create_1 = require("./create");
const find_1 = require("./find");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.floorController = {
    create: create_1.createFloor,
    findAll: find_1.findAllFloor,
    findDetail: find_1.findDetailFloor,
    remove: remove_1.removeFloor,
    update: update_1.updateFLoor
};
