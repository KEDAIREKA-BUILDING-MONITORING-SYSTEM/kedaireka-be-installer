"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomController = void 0;
const create_1 = require("./create");
const find_1 = require("./find");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.roomController = {
    create: create_1.createRoom,
    findAll: find_1.findAllRooms,
    findDetail: find_1.findDetailRoom,
    remove: remove_1.removeRoom,
    update: update_1.updateRoom
};
