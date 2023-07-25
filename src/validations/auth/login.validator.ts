import { ValidationChain, check } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { processValidationResult } from '../../utils/helpers';

/**
 *Contains Login Validator
 * @class Login
 */
class Login {
  /**
   * validate user data.
   * @memberof Login
   * @returns {null} - No response.
   */
  static validateData(): ValidationChain[] {
    return [
      check('email')
        .exists()
        .withMessage('Email is required')
        .not()
        .isEmpty()
        .withMessage('Email cannot be empty')
        .isEmail()
        .withMessage('Email should be a valid email address'),
      check('password')
        .exists()
        .withMessage('Password is required')
        .not()
        .isEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 6 })
        .withMessage('Password should be at least 6 characters long')
        .trim()
        .escape(),
    ];
  }

  /**
   * Process validation result.
   * @param {Request} req - The payload.
   * @param {Response} res - The Response object.
   * @param {Response} next - The next parameter.
   * @memberof SignUp
   * @returns {JSON} - A JSON success response.
   */
  static async myValidationResult(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | object> {
    await processValidationResult(req, res, next);
  }
}
export default Login;
