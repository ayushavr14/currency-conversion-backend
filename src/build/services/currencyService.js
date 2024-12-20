"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupportedCurrencies = exports.convertCurrency = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config/config");
const logger_1 = require("../utils/logger");
const ApiError_1 = require("../utils/ApiError");
const conversion_model_1 = require("../models/conversion.model");
const baseUrl = `${config_1.config.apiBaseUrl}/${config_1.config.exchangeRateApiKey}`;
const convertCurrency = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, to, amount } = data;
        const response = yield axios_1.default.get(`${baseUrl}/pair/${from}/${to}`);
        const { conversion_rate, time_last_update_unix } = response.data;
        const convertedAmount = amount * conversion_rate;
        const result = {
            from,
            to,
            amount,
            convertedAmount,
            rate: conversion_rate,
            timestamp: time_last_update_unix,
        };
        // Save conversion to database
        yield conversion_model_1.Conversion.create(result);
        return result;
    }
    catch (error) {
        logger_1.logger.error("Error converting currency:", error);
        throw new ApiError_1.ApiError(500, "Failed to convert currency");
    }
});
exports.convertCurrency = convertCurrency;
const getSupportedCurrencies = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${baseUrl}/codes`);
        return response.data.supported_codes.map((curr) => ({
            code: curr[0],
            flagUrl: `https://flagcdn.com/w20/${curr[0]
                .slice(0, -1)
                .toLowerCase()}.png`,
        }));
    }
    catch (error) {
        logger_1.logger.error("Error fetching supported currencies:", error);
        throw new ApiError_1.ApiError(500, "Failed to fetch supported currencies");
    }
});
exports.getSupportedCurrencies = getSupportedCurrencies;
