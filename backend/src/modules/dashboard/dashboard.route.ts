import express, { type Express, type Request, type Response } from 'express';
import { obtenerDashboard } from './dashboard.controller';

const dashboard_rout = express.Router();

dashboard_rout.get('/', obtenerDashboard);

export default dashboard_rout;