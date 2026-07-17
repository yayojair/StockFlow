import express, { type Request, type Response, type NextFunction } from 'express';

const auth_router = express.Router();

// middleware that is specific to this router

auth_router.post('/login', (req: Request, res: Response) => {
  res.send('auth route');
});

export default auth_router;
