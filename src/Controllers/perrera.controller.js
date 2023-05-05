import { pool } from '../db.js'

const router = Router()

export const getPerreras = async (req, res) => { //devuleve todas las perreras
    const [rows] = await pool.query('SELECT * FROM Perrera')
    res.json(rows)
}

export const getPerrera = async (req, res) => { //devuelve una perrera
    const [rows] = await pool.query('SELECT * FROM Perrera WHERE id = ?', [req.params.id])
    res.json(rows)
}

export const createPerrera = async (req, res) => { //crea una perrera
    await pool.query('INSERT INTO Perrera (nombre, direccion, telefono, email) VALUES (?,?,?,?)', [req.body.nombre, req.body.direccion, req.body.telefono, req.body.email])
    res.json({ mensaje: 'Perrera creada correctamente' })
}

export const updatePerrera = async (req, res) => { //actualiza una perrera
    await pool.query('UPDATE Perrera SET nombre = ?, direccion = ?, telefono = ?, email = ? WHERE id = ?', [req.body.nombre, req.body.direccion, req.body.telefono, req.body.email, req.params.id])
    res.json({ mensaje: 'Perrera actualizada correctamente' })
}

export const deletePerrera = async (req, res) => { //elimina una perrera
    await pool.query('DELETE FROM Perrera WHERE id = ?', [req.params.id])
    res.json({ mensaje: 'Perrera eliminada correctamente' })
}

export const getUsuariosLiked = async (req, res) => { //devuelve los usuarios que han dado like a una perrera
    const [rows] = await pool.query('SELECT * FROM Usuario WHERE id IN (SELECT id_usuario FROM Usuarios_Perrera WHERE id_perrera = ?)', [req.params.id])
    res.json(rows)
}

export const getRedesSociales = async (req, res) => { //devuelve las redes sociales de una perrera
    const [rows] = await pool.query('SELECT * FROM Redes_Sociales_Perrera WHERE id_perrera = ?', [req.params.id])
    res.json(rows)
}

export const updateRedesSociales = async (req, res) => { //actualiza las redes sociales de una perrera
    await pool.query('UPDATE Redes_Sociales_Perrera SET instagram = ?, facebook = ?, twitter = ?, web = ? WHERE id_perrera = ?', [req.body.instagram, req.body.facebook, req.body.twitter, req.body.web, req.params.id])
    res.json({ mensaje: 'Redes sociales actualizadas correctamente' })
}

export const addRedesSociales = async (req, res) => { //añade las redes sociales de una perrera
    await pool.query('INSERT INTO Redes_Sociales_Perrera (id_perrera, instagram, facebook, twitter, web) VALUES (?,?,?,?,?)', [req.params.id, req.body.instagram, req.body.facebook, req.body.twitter, req.body.web])
    res.json({ mensaje: 'Redes sociales añadidas correctamente' })
}

export const deleteRedesSociales = async (req, res) => { //elimina las redes sociales de una perrera
    await pool.query('DELETE FROM Redes_Sociales_Perrera WHERE id_perrera = ?', [req.params.id])
    res.json({ mensaje: 'Redes sociales eliminadas correctamente' })
}

export const getDogs = async (req, res) => { //devuelve los perros de una perrera
    const [rows] = await pool.query('SELECT * FROM Mascotas JOIN Mascotas_Perrera ON Mascotas.id = Mascotas_Perrera.id_mascota WHERE Mascotas_Perrera.id_perrera = ?', [req.params.id])
    res.json(rows)
}

export const addDog = async (req, res) => { //añade un perro a una perrera
    await pool.query('INSERT INTO Mascotas_Perrera (id_perrera, id_mascota) VALUES (?,?)', [req.params.id, req.body.id_mascota])
    res.json({ mensaje: 'Perro añadido correctamente' })
}

export const deleteDog = async (req, res) => { //elimina un perro de una perrera
    await pool.query('DELETE FROM Mascotas_Perrera WHERE id_perrera = ? AND id_mascota = ?', [req.params.id, req.body.id_mascota])
    res.json({ mensaje: 'Perro eliminado correctamente' })
}
