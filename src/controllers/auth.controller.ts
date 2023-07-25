import AuthServices from '../services/auth.services';
import { Request, Response } from 'express';
import { formatResponse } from '../utils/helpers';
import { IAPIResponse } from '../types';

/**
 * Contains Auth Controller
 * @class AuthController
 */
class AuthController {
  /**
   * Create account for a user.
   * @param {Request} req - The payload.
   * @param {Response} res - The Response object.
   * @memberof AuthController
   * @returns {JSON} - A JSON success response.
   */
  static async register(req: Request, res: Response): Promise<IAPIResponse> {
    const { email, password, firstName, lastName } = req.body;
    const result = await AuthServices.registerUser({
      email,
      password,
      firstName,
      lastName,
    });
    return formatResponse(result, res, 201, false);
  }

  /**
   * Login user.
   * @param {Request} req - The payload.
   * @param {Response} res - The Response object.
   * @memberof AuthController
   * @returns {JSON} - A JSON success response.
   */
  static async login(req: Request, res: Response): Promise<IAPIResponse> {
    const { email, password } = req.body;
    const result = await AuthServices.loginUser({
      email,
      password,
    });
    if (!result) {
      return formatResponse('Invalid Login details', res, 401, true);
    }

    return formatResponse(result, res, 200, false);
  }

  /**
   * Return user profile.
   * @param {Request} req - The payload.
   * @param {Response} res - The Response object.
   * @memberof AuthController
   * @returns {JSON} - A JSON success response.
   */
  static async profile(req: Request, res: Response): Promise<IAPIResponse> {
    const result = await AuthServices.findUser({
      id: req.body.jwtData.data.id,
    });

    return formatResponse({ ...result, password: '' }, res, 200, false);
  }
}

export default AuthController;
