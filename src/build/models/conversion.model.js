"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversion = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const conversionSchema = new mongoose_1.default.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    amount: { type: Number, required: true },
    convertedAmount: { type: Number, required: true },
    rate: { type: Number, required: true },
    timestamp: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});
exports.Conversion = mongoose_1.default.model("Conversion", conversionSchema);
