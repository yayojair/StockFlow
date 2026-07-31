import express, { type Express, type Request, type Response } from 'express';
import { crearProducto } from './productos.controller';

const producto_rout = express.Router();

producto_rout.post('/crear', crearProducto);

export default producto_rout;