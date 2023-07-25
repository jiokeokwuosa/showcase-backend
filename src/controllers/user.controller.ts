import { Request, Response } from 'express';
import { formatResponse } from '../utils/helpers';
import { IAPIResponse } from '../types';
import axios from 'axios';

/**
 *Contains User Controller
 * @class UserController
 */
class UserController {
  /**
   * Return random user.
   * @param {Request} req - The payload.
   * @param {Response} res - The Response object.
   * @memberof AuthController
   * @returns {JSON} - A JSON success response.
   */
  static async randomUser(req: Request, res: Response): Promise<IAPIResponse | undefined> {
    try {
      const result = await axios.get('https://randomuser.me/api/');
      return formatResponse(result.data.results[0], res, 200, false);
    } catch (error) {
      console.log(error)
    }
  }
}

export default UserController;
