"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../utils/logger");
const ApiError_1 = require("../utils/ApiError");
const errorHandler = (error, _req, res, _next) => {
    logger_1.logger.error(error);
    if (error instanceof ApiError_1.ApiError) {
        return res.status(error.statusCode).json({
            error: error.message,
        });
    }
    return res.status(500).json({
        error: "Internal server error",
    });
};
exports.errorHandler = errorHandler;
