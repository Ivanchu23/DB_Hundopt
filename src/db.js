import {createPool} from 'mysql2/promise'

export const pool = createPool({
    user: 'root',
    password: '123456789',
    host: 'localhost',
    port: 3306,
    database: 'hundopt_ddbb'
})


