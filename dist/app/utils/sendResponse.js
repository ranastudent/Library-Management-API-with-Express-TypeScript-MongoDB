"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    const responsePayload = {
        success: data.success,
        message: data.message,
    };
    if (data.data !== undefined) {
        responsePayload.data = data.data;
    }
    if (data.error !== undefined) {
        responsePayload.error = data.error;
    }
    res.status(data.statusCode).json(responsePayload);
};
exports.default = sendResponse;
