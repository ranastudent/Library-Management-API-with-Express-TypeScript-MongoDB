import { Response } from "express";
import { MongooseError } from "mongoose";
import { ZodError } from "zod";

interface IApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  error?: unknown | Error | ZodError | MongooseError;
}

const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const responsePayload: Record<string, unknown> = {
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

export default sendResponse;
