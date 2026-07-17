import express, { type Request, type Response, type NextFunction } from 'express';
import { login_controller } from './auth.controller';

const auth_router = express.Router();

// middleware that is specific to this router

auth_router.post('/login', (req: Request, res: Response) => {
  login_controller(req, res);
});

export default auth_router;
