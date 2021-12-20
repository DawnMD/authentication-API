import { Request, Response } from 'express';
import { comparePassowrd, hashPassword } from '../utils/passwordUtils';
import { PrismaClient } from '@prisma/client';
import { generateAccessToken, generateRefreshToken } from '../utils/token';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const hashedPassword = await hashPassword(password);

  try {
    const userPresent = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userPresent) {
      return res
        .status(409)
        .json({ message: 'User with email already exists' });
    }

    await prisma.user.create({
      data: {
        email,
        lname,
        fname,
        password: hashedPassword,
        username,
      },
    });

    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(424).json({ message: 'Failed to create user' });
  }
};

export const login = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ message: 'User with email not found' });
    }

    const passwordVerified = await comparePassowrd(user.password, password);

    if (!passwordVerified) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const tokenPayload = {
      id: user.id,
      email: user.email,
      firstName: user.fname,
      lastName: user.lname,
    };

    const accessToken = generateAccessToken(tokenPayload);

    const refreshToken = generateRefreshToken(tokenPayload);

    res.cookie('APIJWT', refreshToken, {
      httpOnly: true,
    });

    res.status(200).json({ access_token: accessToken });
  } catch (error) {
    res.status(424).json({ message: 'Login failed' });
  }
};

export const refreshToken = (req: Request, res: Response) => {};

export const deleteAccount = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ message: 'User with email not found' });
    }

    const passwordVerified = await comparePassowrd(user.password, password);

    if (!passwordVerified) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    await prisma.user.delete({
      where: {
        email: email,
      },
    });

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(424).json({ message: 'Delete failed' });
  }
};
