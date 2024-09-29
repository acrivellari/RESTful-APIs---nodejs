import { Pool } from 'pg';

export const dbConnection = new Pool({
    user: 'postgres',
    password: 'ecam123.',
    host: 'localhost',
    port: 5432,
    database: 'training-records',
});