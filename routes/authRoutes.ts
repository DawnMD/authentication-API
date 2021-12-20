import { Router } from 'express';
import {
  deleteAccount,
  login,
  refreshToken,
  register,
} from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.delete('/delete-account', deleteAccount);

export default router;
