"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
const devicePortLogs_1 = require("./devicePortLogs");
const devicePorts_1 = require("./devicePorts");
const buildings_1 = require("./buildings");
const rooms_1 = require("./rooms");
const floor_1 = require("./floor");
exports.DeviceModel = _1.sequelize.define('devices', {
    ...zygote_1.ZygoteModel,
    deviceId: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    deviceName: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    deviceBuildingId: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    deviceRoomId: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    deviceFloorId: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    deviceToken: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false
    },
    deviceStatus: {
        type: sequelize_1.DataTypes.ENUM('active', 'inactive', 'standby'),
        allowNull: false,
        defaultValue: 'standby'
    },
    deviceTimmer: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: true
    }
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: 'devices',
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
exports.DeviceModel.hasMany(devicePortLogs_1.DevicePortLogsModel, {
    as: 'devicePortLogs',
    sourceKey: 'deviceId',
    foreignKey: 'devicePortLogDeviceId'
});
exports.DeviceModel.hasMany(devicePorts_1.DevicePortsModel, {
    as: 'devicePorts',
    sourceKey: 'deviceId',
    foreignKey: 'devicePortDeviceId'
});
exports.DeviceModel.hasOne(buildings_1.BuildingsModel, {
    as: 'building',
    sourceKey: 'deviceBuildingId',
    foreignKey: 'buildingId'
});
exports.DeviceModel.hasOne(floor_1.FloorsModel, {
    as: 'floor',
    sourceKey: 'deviceFloorId',
    foreignKey: 'floorId'
});
exports.DeviceModel.hasOne(rooms_1.RoomsModel, {
    as: 'room',
    sourceKey: 'deviceRoomId',
    foreignKey: 'roomId'
});
