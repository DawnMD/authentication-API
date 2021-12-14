import { Request, Response, Router } from 'express';
import { hashPassword } from '../utils/passwordUtils';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const hashedPassword = await hashPassword(password);
  res.status(201).json({ username, hashedPassword, fname, lname });
});

export default router;
