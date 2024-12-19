import { Request, Response, NextFunction } from "express";
import {
  convertCurrency,
  getSupportedCurrencies,
} from "../services/currencyService";
import { logger } from "../utils/logger";
import { Conversion } from "../models/conversion.model";

export const convert = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await convertCurrency(req.body);
    logger.info(`Conversion completed: ${req.body.from} to ${req.body.to}`);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getCurrencies = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const currencies = await getSupportedCurrencies();
    res.json(currencies);
  } catch (error) {
    next(error);
  }
};

export const getHistory = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const history = await Conversion.find().sort({ createdAt: -1 }).limit(10);
    res.json(history);
  } catch (error) {
    next(error);
  }
};
