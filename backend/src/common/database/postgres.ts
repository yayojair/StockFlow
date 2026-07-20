import { Pool } from "pg";
import dotenv from 'dotenv';
import { AppErrors } from "../errors/app.error";

dotenv.config();

const puerto: string | undefined = process.env.DB_PORT;
const host: string | undefined = process.env.DB_HOST ;
const user: string | undefined = process.env.DB_USER;
const name: string | undefined= process.env.DB_NAME;
const password: string | undefined = process.env.DB_PASSWORD;


if (!puerto || !host || !user || !name || !password) {
    const faltantes = [];
    if (!puerto) faltantes.push("DB_PORT");
    if (!host) faltantes.push("DB_HOST");
    if (!user) faltantes.push("DB_USER");
    if (!name) faltantes.push("DB_NAME");
    if (!password) faltantes.push("DB_PASSWORD");

    throw new AppErrors(`Error de configuración: Faltan las siguientes variables en el archivo .env: ${faltantes.join(', ')}`, 500);
}


const pool_db = new Pool({
        host: host,
        port: Number(puerto),
        database:name,
        user: user,
        password:password,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
        maxLifetimeSeconds: 60,
    });

export default pool_db;

