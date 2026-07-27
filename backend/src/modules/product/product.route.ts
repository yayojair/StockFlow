import express, { type Express, type Request, type Response } from 'express';
import { obtenerProductos } from './product.controller';

const product_rout = express.Router();

product_rout.get('/lista', obtenerProductos);

export default product_rout;