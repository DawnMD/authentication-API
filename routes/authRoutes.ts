import { Router } from 'express';
import { deleteAccount, login, register } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/delete-account', deleteAccount);

export default router;
