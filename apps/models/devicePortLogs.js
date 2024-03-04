"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicePortLogsModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
exports.DevicePortLogsModel = _1.sequelize.define('device_port_logs', {
    ...zygote_1.ZygoteModel,
    devicePortLogId: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    devicePortLogDeviceId: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    devicePortLogValue: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    devicePortLogName: {
        type: sequelize_1.DataTypes.STRING(80),
        allowNull: true
    },
    devicePortLogPortNumber: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    devicePortLogCategory: {
        type: sequelize_1.DataTypes.STRING(80),
        allowNull: false
    }
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: 'device_port_logs',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB',
    hooks: {
        beforeCreate: (record, options) => {
            const now = (0, moment_1.default)().add(7, 'hours').format('YYYY-MM-DD HH:mm:ss');
            record.createdAt = now;
            record.updatedAt = null;
        },
        beforeUpdate: (record, options) => {
            const now = (0, moment_1.default)().add(7, 'hours').format('YYYY-MM-DD HH:mm:ss');
            record.updatedAt = now;
        }
    }
});
