import { Router } from 'express';
import authRouter from './auth.route';
import userRoute from './user.route';

const router = Router();

router.use('/auth', authRouter);
router.use("/users", userRoute);

export default router;
