import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '../models/user.model';
import { userValidationSchema } from '../validators/user.validator';
import { BadRequestError } from '../../../utils/errors/http.error';
import { formatJoiError } from '../../../utils/errors/errorFormatter';
import { SuccessResponse } from '../../../utils/responses/successResponse';
import { ErrorMessages } from '../../../utils/errorCodes';
import jwt, { Secret } from 'jsonwebtoken';

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
const generateAuthToken = (id: string) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET as Secret, {
    expiresIn: '1h',
  });
  return token;
};
