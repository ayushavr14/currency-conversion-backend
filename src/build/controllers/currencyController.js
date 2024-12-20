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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistory = exports.getCurrencies = exports.convert = void 0;
const currencyService_1 = require("../services/currencyService");
const logger_1 = require("../utils/logger");
const conversion_model_1 = require("../models/conversion.model");
const convert = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, currencyService_1.convertCurrency)(req.body);
        logger_1.logger.info(`Conversion completed: ${req.body.from} to ${req.body.to}`);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.convert = convert;
const getCurrencies = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currencies = yield (0, currencyService_1.getSupportedCurrencies)();
        res.json(currencies);
    }
    catch (error) {
        next(error);
    }
});
exports.getCurrencies = getCurrencies;
const getHistory = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const history = yield conversion_model_1.Conversion.find().sort({ createdAt: -1 }).limit(10);
        res.json(history);
    }
    catch (error) {
        next(error);
    }
});
exports.getHistory = getHistory;
