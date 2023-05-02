import { pool } from '../db.js'

export const ping = async (req, res) => {
    const result = await pool.query('SELECT "Hello world" AS RESULT')
    console.log(result)
}
