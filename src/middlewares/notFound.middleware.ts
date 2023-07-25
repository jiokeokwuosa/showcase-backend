import { Request, Response, NextFunction } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new Error('No endpoint found');
  res.status(404);
  next(err);
};

export default notFound;
