import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '../models/user.model';
import { userValidationSchema } from '../validators/user.validator';
import { BadRequestError } from '../../../utils/errors/http.error';
import { formatJoiError } from '../../../utils/errors/errorFormatter';
import { SuccessResponse } from '../../../utils/responses/successResponse';
import { ErrorMessages } from '../../../utils/errorCodes';
import jwt, { Secret } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { userLoginSchema } from '../validators/userLogin.validator';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body: IUser = req.body;
    const { error, value } = userValidationSchema.validate(body);

    if (error) {
      throw new BadRequestError(formatJoiError(error));
    }

    // Check if the user already exists
    const existingUser = await User.findOne({
      email: value.email,
    });
    if (existingUser) {
      throw new BadRequestError({
        email: ErrorMessages.emailExists,
      });
    }

    const newUser = new User(value);
    await newUser.save();
    //access token
    const accessToken = generateAuthToken(newUser._id.toString());
    const { password, ...user } = newUser.toObject();
    return SuccessResponse(res, { user, accessToken });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const { error } = userLoginSchema.validate({ email, password });
    if (error) {
      throw new BadRequestError(formatJoiError(error));
    }
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError({
        email: ErrorMessages.userNotFound,
      });
    }
    // Check if the password matches
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestError({
        password: ErrorMessages.passwordMismatch
      });
    }
    // Generate an access token
    const accessToken = generateAuthToken(user._id.toString());
    const { password: userPassword, ...userData } = user.toObject();
    return SuccessResponse(res, { user: userData, accessToken });
  } catch (err) {
    next(err);
  }
};
const generateAuthToken = (id: string) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET as Secret, {
    expiresIn: '1h',
  });
  return token;
};
