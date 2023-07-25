import { User, Prisma } from '@prisma/client';
import { prisma } from '../utils/prisma';
import { IUser, IRegisterResponse, IUserLoginData } from '../types';
import {
  encryptPassword,
  generateToken,
  verifyPassword,
} from '../utils/helpers';

export default {
  /**
   * Find existing user.
   * @param {Prisma.UserWhereUniqueInput} userWhereUniqueInput - The payload.
   * @returns {JSON} - A JSON success response.
   */
  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return await prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  },

  /**
   * Register user.
   * @param {IUser} user - The payload.
   * @returns {JSON} - A JSON success response.
   */
  async registerUser(user: IUser): Promise<IRegisterResponse> {
    // encrypt password
    const passwordHash = await encryptPassword(user.password);
    user.password = passwordHash;

    const newUser = await prisma.user.create({
      data: user,
    });

    // generate jwt token
    const token = generateToken(newUser.id, user.email);

    return {
      user: {
        ...newUser,
        password: '',
      },
      token,
    };
  },

  /**
   * Login user.
   * @param {IUser} userData - The payload.
   * @returns {JSON} - A JSON success response.
   */
  async loginUser(userData: IUserLoginData): Promise<IRegisterResponse | null> {
    // check if email exist
    const userExist = await this.findUser({ email: userData.email });
    if (!userData) return null;

    // check if password match
    const confirmPassword = await verifyPassword(
      userData.password,
      `${userExist?.password}`,
    );
    if (!confirmPassword) return null;

    // generate jwt token
    const token = generateToken(`${userExist?.id}`, `${userExist?.email}`);

    return {
      user: {
        ...userExist!,
        password: '',
      },
      token,
    };
  },
};
