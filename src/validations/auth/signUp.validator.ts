import { ValidationChain, check } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import AuthServices from '../../services/auth.services';
import { formatResponse, processValidationResult } from '../../utils/helpers';

/**
 *Contains Signup Validator
 * @class SignUp
 */
class SignUp {
  /**
   * validate user data.
   * @memberof SignUp
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
      check('firstName')
        .exists()
        .withMessage('First name is required')
        .not()
        .isEmpty()
        .withMessage('First name  cannot be empty')
        .isLength({ min: 2 })
        .withMessage('First name  should be at least 2 characters long')
        .trim()
        .escape(),
      check('lastName')
        .exists()
        .withMessage('Last name is required')
        .not()
        .isEmpty()
        .withMessage('Last name  cannot be empty')
        .isLength({ min: 2 })
        .withMessage('Last name  should be at least 2 characters long')
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

  /**
   * Check whether email already exist.
   * @param {Request} req - The payload.
   * @param {Response} res - The Response object.
   * @param {Response} next - The next parameter.
   * @memberof SignUp
   * @returns {JSON} - A JSON response.
   */
  static async emailAlreadyExist(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | object> {
    const { email } = req.body;
    const user = await AuthServices.findUser({ email });
    if (user) {
      return formatResponse('Email address already exists', res, 409, true);
    }
    return next();
  }
}
export default SignUp;
