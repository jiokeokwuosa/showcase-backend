import { User, Prisma } from '@prisma/client';
import { prisma } from '../utils/prisma';
import { IUser, IRegisterResponse } from '../types';
import { encrptPassword, generateToken } from '../utils/helpers';

export default {
  /**
   * Find exisiting user.
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
  async registerUser(
    user: IUser,
  ): Promise<IRegisterResponse> {
    // encrpt password
    const passwordHash = await encrptPassword(user.password);
    user.password = passwordHash

    const newUser = await prisma.user.create({
      data: user
    });
    // generate jwt token
    const token = generateToken(newUser.id, user.email);

    return {
      user: newUser,
      token
    }
  },


};
