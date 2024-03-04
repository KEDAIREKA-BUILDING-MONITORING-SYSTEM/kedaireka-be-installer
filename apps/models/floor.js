"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloorsModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
const buildings_1 = require("./buildings");
exports.FloorsModel = _1.sequelize.define('floors', {
    ...zygote_1.ZygoteModel,
    floorId: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    floorName: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    floorBuildingId: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    }
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: 'floors',
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
exports.FloorsModel.hasOne(buildings_1.BuildingsModel, {
    as: 'building',
    sourceKey: 'floorBuildingId',
    foreignKey: 'buildingId'
});
