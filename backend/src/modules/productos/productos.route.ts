import express, { type Express, type Request, type Response } from 'express';
import { crearProducto, filtrarProducto, listarProducto, actualizarProducto, eliminarProducto } from './productos.controller';

const producto_rout = express.Router();

producto_rout.post('/crear', crearProducto);
producto_rout.get('/listar', listarProducto);
producto_rout.get('/nombre', filtrarProducto);
producto_rout.put('/actualizar', actualizarProducto);
producto_rout.delete('/eliminar', eliminarProducto);

export default producto_rout;