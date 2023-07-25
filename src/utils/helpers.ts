import { NextFunction, Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { IAPIResponse } from '../types';
import { validationResult } from 'express-validator';

config();

export const formatResponse = (
  data: unknown,
  res: Response,
  statusCode: number,
  isError?: boolean,
): IAPIResponse => {
  return res.status(statusCode).json({
    statusCode,
    data: !isError ? data : undefined,
    error: isError ? data : undefined,
  });
};

export const encryptPassword = async (password: string): Promise<string> => {
  const pass = await bcrypt.hash(password, 8);
  return pass;
};

export const verifyPassword = async (
  plainText: string,
  hashedText: string,
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(plainText, hashedText);
  return isMatch;
};

export const generateToken = (id: string, email: string) => {
  const token = jwt.sign(
    {
      data: { id, email },
    },
    `${process.env.JWT_SECRET}`,
    { expiresIn: '7d' },
  );
  return token;
};

export const processErrors = (id: string, email: string) => {
  const token = jwt.sign(
    {
      data: { id, email },
    },
    `${process.env.JWT_SECRET}`,
    { expiresIn: '7d' },
  );
  return token;
};

export const processValidationResult = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errArr = errors.array().map(({ msg }) => msg);
    return formatResponse(errArr, res, 400, true);
  }
  return next();
};
