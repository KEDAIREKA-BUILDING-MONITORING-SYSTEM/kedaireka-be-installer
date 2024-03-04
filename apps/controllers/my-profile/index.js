"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myProfileController = void 0;
const find_1 = require("./find");
const login_1 = require("./login");
const update_1 = require("./update");
exports.myProfileController = {
    find: find_1.findMyProfile,
    update: update_1.updateMyProfile,
    login: login_1.loginMyProfile
};
