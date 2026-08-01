import express, { type Express, type Request, type Response } from 'express';
import { crearProducto, filtrarProducto, listarProducto } from './productos.controller';

const producto_rout = express.Router();

producto_rout.post('/crear', crearProducto);
producto_rout.get('/listar', listarProducto);
producto_rout.get('/nombre', filtrarProducto);

export default producto_rout;