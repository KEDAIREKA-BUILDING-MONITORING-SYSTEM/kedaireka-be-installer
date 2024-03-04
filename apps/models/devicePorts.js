"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicePortsModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
exports.DevicePortsModel = _1.sequelize.define('device_ports', {
    ...zygote_1.ZygoteModel,
    devicePortId: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    devicePortDeviceId: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    devicePortName: {
        type: sequelize_1.DataTypes.STRING(80),
        allowNull: false
    },
    devicePortCategory: {
        type: sequelize_1.DataTypes.STRING(80),
        allowNull: false
    },
    devicePortNumber: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    devicePortStatus: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: 'device_ports',
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
