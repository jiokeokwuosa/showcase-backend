import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import v1Router from './routes';
import logger from './middlewares/logger.middleware';
import notFound from './middlewares/notFound.middleware';
import serverError from './middlewares/serverError.middleware';

config();

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// base url
app.get('/api/v1', (req: Request, res: Response) =>
  res
    .status(200)
    .json({ status: 'success', message: 'Welcome to Showcase API' }),
);
app.use('/api/v1', v1Router);

app.use(notFound);
app.use(serverError);

//server
app.listen(port, () => {
  console.log(`Server running at port ${port} on ${process.env.NODE_ENV}`);
});

export default app;
