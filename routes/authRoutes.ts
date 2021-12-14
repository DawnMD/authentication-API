import { Request, Response, Router } from 'express';

const router = Router();

router.get('/register', (req: Request, res: Response) => {
  const username = req.body.username;
});

export default router;
