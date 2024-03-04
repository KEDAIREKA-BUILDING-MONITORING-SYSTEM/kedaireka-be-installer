"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONSOLE = void 0;
const configs_1 = require("../configs");
exports.CONSOLE = {
    log: function (message, ...optionalParams) {
        configs_1.CONFIG.log && console.log(message, ...optionalParams);
    },
    info: function (message, ...optionalParams) {
        configs_1.CONFIG.log && console.info(message, ...optionalParams);
    },
    warn: function (message, ...optionalParams) {
        configs_1.CONFIG.log && console.warn(message, ...optionalParams);
    },
    error: function (message, ...optionalParams) {
        configs_1.CONFIG.log && console.error(message, ...optionalParams);
    },
    table: function (tabularData, properties) {
        configs_1.CONFIG.log && console.table(tabularData, properties);
    }
};
