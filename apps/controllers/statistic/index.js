"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statisticController = void 0;
const current_1 = require("./current");
const statistic_1 = require("./statistic");
exports.statisticController = {
    findAll: statistic_1.statistic,
    totalCurrentConsumption: current_1.totalCurrentConsumption,
    allCurrentConsumption: current_1.allCurrentConsumption
};
