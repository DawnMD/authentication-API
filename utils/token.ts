import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '15m',
  });
};
