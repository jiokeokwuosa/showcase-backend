import { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(
    `${timestamp} host=${req.hostname} method=${req.method} path=${req.url}`,
  );
  next();
};

export default logger;
