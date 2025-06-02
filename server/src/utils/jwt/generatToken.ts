import { Secret, sign } from 'jsonwebtoken';

const { JWT_SECRET: JWT_SECRET } = process.env;

const generatToken = async (id: string, expiresIn?: any) => {
  return await sign({ id }, JWT_SECRET as Secret, {
    expiresIn: expiresIn || '1d',
  });
};

export default generatToken;
