import { Request, Response } from 'express';

const notFound = (req: Request, res: Response /* next: NextFunction */) => {
  res.status(404).json({
    status: 'error',
    message: 'No endpoint found',
  });
};

export default notFound;
