import { User } from "@prisma/client";

export interface IErrorResponse {
  status: number;
  message: string;
}

export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string
}

export interface IRegisterResponse {
  user: User;
  token: string;
}

export interface IAPIResponse {
  statusCode: number;
  data?: unknown;
  error?: unknown,
}