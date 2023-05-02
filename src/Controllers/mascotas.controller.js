import { pool } from '../db.js'


export const createMascota = async (req, res) => {await pool.query('INSERT INTO Mascotas (nombre, raza, ubicacion, peso, reservado) VALUES (?,?,?,?,?)', [req.body.nombre, req.body.raza, req.body.ubicacion, req.body.peso, req.body.reservado])}


export const getMascotas = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM Mascotas')
    res.json(rows)
}

export const getMascota = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM Mascotas WHERE id = ?', [req.params.id])
    res.json(rows)
}