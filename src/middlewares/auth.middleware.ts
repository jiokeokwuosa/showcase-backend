import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { formatResponse } from '../utils/helpers';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers as { token: string };

  if (!token) {
    return formatResponse('Access token is Required', res, 401, true);
  }
  jwt.verify(token, `${process.env.JWT_SECRET}`, (error, result) => {
    if (error) {
      return formatResponse('Access token is Invalid', res, 401, true);
    } else {
      req.body.jwtData = result;
    }

    return next();
  });
};
export default validateToken;
