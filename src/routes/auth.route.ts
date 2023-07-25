import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import SignUpValidator from './../validations/auth/signUp.validator';
import LoginValidator from '../validations/auth/login.validator';
import validateToken from '../middlewares/auth.middleware';

const router = Router();

router.post(
  '/register',
  SignUpValidator.validateData(),
  SignUpValidator.myValidationResult,
  SignUpValidator.emailAlreadyExist,
  AuthController.register,
);

router.post(
  '/login',
  LoginValidator.validateData(),
  LoginValidator.myValidationResult,
  AuthController.login,
);

router.get('/profile', validateToken, AuthController.profile);

export default router;
