"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSuperAdmin = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("../models/user");
const isSuperAdmin = async ({ userId }) => {
    const checkAdmin = await user_1.UserModel.findOne({
        raw: true,
        where: {
            deleted: { [sequelize_1.Op.eq]: 0 },
            userId: { [sequelize_1.Op.eq]: userId },
            userRole: { [sequelize_1.Op.eq]: 'superAdmin' }
        }
    });
    return checkAdmin != null;
};
exports.isSuperAdmin = isSuperAdmin;
