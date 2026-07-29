import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';

import auth_router from './modules/auth/auth.route';
import dashboard_rout from './modules/dashboard/dashboard.route';

import { authMiddleware } from './middleware/auth.middleware';

const app: Express = express();

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));

app.use(express.json());

app.use('/auth', auth_router);

app.use('/dashboard', authMiddleware, dashboard_rout);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});


export default app;