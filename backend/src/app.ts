import express, { type Express, type Request, type Response } from 'express';
import auth_router from './modules/auth/auth.route';

const app: Express = express();


app.use('/auth', auth_router);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});


export default app;