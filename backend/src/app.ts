import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';

import auth_router from './modules/auth/auth.route';
import product_rout from './modules/product/product.route';

import { authMiddleware } from './middleware/auth.middleware';

const app: Express = express();

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));

app.use(express.json());

app.use('/auth', auth_router);

app.use('/product', authMiddleware, product_rout);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});


export default app;