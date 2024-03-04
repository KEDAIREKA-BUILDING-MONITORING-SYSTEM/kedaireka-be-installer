"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportController = void 0;
const create_1 = require("./create");
const find_1 = require("./find");
const remove_1 = require("./remove");
exports.reportController = {
    create: create_1.reportCreate,
    findAll: find_1.findAllReport,
    findDetail: find_1.findDetailReport,
    remove: remove_1.removeReport
};
