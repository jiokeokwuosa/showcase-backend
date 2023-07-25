import AuthServices from "../services/auth.services";
import { Request, Response } from 'express';
import { formatResponse } from "../utils/helpers";
import { IAPIResponse } from "../types";

/**
 *Contains Auth Controller
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
    static async signUp(req: Request, res: Response): Promise<IAPIResponse> {
        const { email, password, firstName,  lastName } = req.body;
        const result = await AuthServices.registerUser({
            email, password, firstName,  lastName  
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
    //   static async login(req, res) {
    //     try {
    //       const { email, password } = req.body;
    //       const user = await AuthServices.emailExist(email, res);

    //       const confirmPassword = await Helper.verifyPassword(
    //         password,
    //         user.password
    //       );

    //       if (!confirmPassword || !user) {
    //         return res.status(401).json({
    //           status: "401 Unauthorized",
    //           error:
    //             "Invalid Login details.",
    //         });
    //       }

    //       const token = await Helper.generateToken(
    //         user.id,
    //         user.email,
    //         user.fullName
    //       );

    //       return res.status(200).json({
    //         status: "success",
    //         data: {
    //           token,
    //           user,
    //         },
    //       });
    //     } catch (err) {
    //       return res.status(500).json({
    //         status: "500 Internal server error",
    //         error:
    //           "Error logging in user",
    //       });
    //     }
    //   }
}
export default AuthController;
