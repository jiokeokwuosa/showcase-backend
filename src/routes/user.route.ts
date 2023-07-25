import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();

router.get('/random', UserController.randomUser);

export default router;
