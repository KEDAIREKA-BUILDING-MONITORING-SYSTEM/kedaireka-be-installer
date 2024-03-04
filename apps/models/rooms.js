"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
const buildings_1 = require("./buildings");
const floor_1 = require("./floor");
exports.RoomsModel = _1.sequelize.define('rooms', {
    ...zygote_1.ZygoteModel,
    roomId: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    roomName: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    roomBuildingId: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    roomFloorId: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    }
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: 'rooms',
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
exports.RoomsModel.hasOne(buildings_1.BuildingsModel, {
    as: 'building',
    sourceKey: 'roomBuildingId',
    foreignKey: 'buildingId'
});
exports.RoomsModel.hasOne(floor_1.FloorsModel, {
    as: 'floor',
    sourceKey: 'roomFloorId',
    foreignKey: 'floorId'
});
