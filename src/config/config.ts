import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  exchangeRateApiKey: process.env.EXCHANGE_RATE_API_KEY || "",
  nodeEnv: process.env.NODE_ENV || "development",
  apiBaseUrl: "https://v6.exchangerate-api.com/v6",
};
