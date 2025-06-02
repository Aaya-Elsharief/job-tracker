import { NextFunction, Request, Response } from 'express';
import { compare } from 'bcryptjs';
import { User, IUser } from '../models';
import {
  userValidationSchema,
  userLoginSchema,
  emailValidationSchema,
} from '../validators';
import { BadRequestError, formatJoiError } from '../../../utils/errors/';
import {
  SuccessMessages,
  SuccessResponse,
  ErrorMessages,
} from '../../../utils/responses/';
import generatToken from '../../../utils/jwt/generatToken';
import { sendMail } from '../../../utils/mail/sendEmail';

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
    const accessToken = generatToken(newUser._id.toString());
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
        password: ErrorMessages.passwordMismatch,
      });
    }
    // Generate an access token
    const accessToken = await generatToken(user._id.toString());
    const { password: userPassword, ...userData } = user.toObject();
    return SuccessResponse(res, { user: userData, accessToken });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new BadRequestError({
        user: ErrorMessages.userNotFound,
      });
    }

    return SuccessResponse(res, { user });
  } catch (err) {
    next(err);
  }
};

export const forgetPassword = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;
    const { error } = emailValidationSchema.validate({ email });
    if (error) {
      throw new BadRequestError(formatJoiError(error));
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError({
        email: ErrorMessages.userNotFound,
      });
    }

    // generate reset token
    const resetToken = await generatToken(user._id.toString(), '1h');

    const link = 'front-end-url-reset-password';
    const resetURL = `/${link}?token=${resetToken}`;
    sendMail(email, resetURL, 'Reset your password');

    return SuccessResponse(res, { message: SuccessMessages.checkYourMail });
  } catch (err) {
    next(err);
  }
};
