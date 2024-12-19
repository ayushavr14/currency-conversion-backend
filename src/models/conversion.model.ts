import mongoose from "mongoose";

const conversionSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  amount: { type: Number, required: true },
  convertedAmount: { type: Number, required: true },
  rate: { type: Number, required: true },
  timestamp: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Conversion = mongoose.model("Conversion", conversionSchema);
