"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingController = void 0;
const create_1 = require("./create");
const find_1 = require("./find");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.settingController = {
    create: create_1.createBuilding,
    findAll: find_1.findAllSetting,
    findDetail: find_1.findBuildingDetail,
    remove: remove_1.removeBuilding,
    update: update_1.updateBuilding
};
