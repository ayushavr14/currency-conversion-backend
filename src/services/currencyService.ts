import axios from "axios";
import { config } from "../config/config";
import {
  ConversionRequest,
  ConversionResponse,
  ExchangeRateApiResponse,
} from "../interfaces/currency.interface";
import { logger } from "../utils/logger";
import { ApiError } from "../utils/ApiError";
import { Conversion } from "../models/conversion.model";

const baseUrl = `${config.apiBaseUrl}/${config.exchangeRateApiKey}`;

export const convertCurrency = async (
  data: ConversionRequest
): Promise<ConversionResponse> => {
  try {
    const { from, to, amount } = data;
    const response = await axios.get<ExchangeRateApiResponse>(
      `${baseUrl}/pair/${from}/${to}`
    );

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
    await Conversion.create(result);

    return result;
  } catch (error) {
    logger.error("Error converting currency:", error);
    throw new ApiError(500, "Failed to convert currency");
  }
};

interface CurrencyInfo {
  code: string;
  flagUrl: string;
}

export const getSupportedCurrencies = async (): Promise<CurrencyInfo[]> => {
  try {
    const response = await axios.get(`${baseUrl}/codes`);
    return response.data.supported_codes.map((curr: string[]) => ({
      code: curr[0],
      flagUrl: `https://flagcdn.com/w20/${curr[0]
        .slice(0, -1)
        .toLowerCase()}.png`,
    }));
  } catch (error) {
    logger.error("Error fetching supported currencies:", error);
    throw new ApiError(500, "Failed to fetch supported currencies");
  }
};
