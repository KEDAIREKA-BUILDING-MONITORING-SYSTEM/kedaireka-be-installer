"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const creat_1 = require("./creat");
const find_1 = require("./find");
const login_1 = require("./login");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.adminController = {
    find: find_1.findOneAdmin,
    findAll: find_1.findAllAdmin,
    create: creat_1.createAdmin,
    login: login_1.loginAdmin,
    remove: remove_1.removeAdmin,
    update: update_1.updateAdmin
};
