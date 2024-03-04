"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestChecker = void 0;
const requestChecker = ({ requireList, requestData }) => {
    const emptyField = [];
    // eslint-disable-next-line array-callback-return
    requireList.map((value) => {
        if (requestData[value] === undefined) {
            emptyField.push(value);
        }
    });
    return emptyField.toString();
};
exports.requestChecker = requestChecker;
