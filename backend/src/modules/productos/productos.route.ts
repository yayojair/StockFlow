import express, { type Express, type Request, type Response } from 'express';
import { crearProducto, listarProducto } from './productos.controller';

const producto_rout = express.Router();

producto_rout.post('/crear', crearProducto);
producto_rout.get('/listar', listarProducto);

export default producto_rout;