import { Request, Response } from 'express';
import { IErrorResponse } from '../types';

const serverError = (err: IErrorResponse, req: Request, res: Response) => {
  res.status(err.status || 500).json({
    status: 'error',
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
};

export default serverError;
