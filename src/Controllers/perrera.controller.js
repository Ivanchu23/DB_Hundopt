import { pool } from '../db.js'


export const getPerreras = async (req, res) => { //devuleve todas las perreras
    try {
        const [rows] = await pool.query('SELECT * FROM Perrera')
        res.json(rows)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las perreras' })
    }
}

export const getPerrera = async (req, res) => { //devuelve una perrera
    try {
        const [rows] = await pool.query('SELECT * FROM Perrera WHERE id = ?', [req.params.id])
        res.json(rows)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la perrera' })
    }
}

export const createPerrera = async (req, res) => {
    const { nombre, direccion, telefono, email, mascotas_id } = req.body;
  
    if (!nombre || !direccion || !telefono || !email || !mascotas_id) {
      return res.status(400).json({ mensaje: 'Faltan campos necesarios' });
    }
  
    try {
      await pool.query('INSERT INTO Perrera (nombre, direccion, telefono, email, mascotas_id) VALUES (?, ?, ?, ?, ?)', [nombre, direccion, telefono, email, JSON.stringify(mascotas_id)]);
      res.json({ mensaje: 'Perrera creada correctamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensaje: 'Error al crear la perrera' });
    }
  };
  
  
export const updatePerrera = async (req, res) => { //actualiza una perrera
    try {
        await pool.query('UPDATE Perrera SET nombre = ?, direccion = ?, telefono = ?, email = ? WHERE id = ?', [req.body.nombre, req.body.direccion, req.body.telefono, req.body.email, req.params.id])
        res.json({ mensaje: 'Perrera actualizada correctamente' })
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la perrera' })
    }
}

export const deletePerrera = async (req, res) => { //elimina una perrera
    try {
        await pool.query('DELETE FROM Perrera WHERE id = ?', [req.params.id])
        res.json({ mensaje: 'Perrera eliminada correctamente' })
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la perrera' })
    }
}

export const getUsuariosLiked = async (req, res) => { //devuelve los usuarios que han dado like a una perrera
    try {
        const [rows] = await pool.query('SELECT * FROM Usuarios WHERE id IN (SELECT id_usuario FROM Usuarios_Perrera WHERE id_perrera = ?)', [req.params.id])
        res.json(rows)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios que han dado like a la perrera' })
    }
}

export const getRedesSociales = async (req, res) => { //devuelve las redes sociales de una perrera
    try {
        const [rows] = await pool.query('SELECT * FROM Redes_Sociales_Perrera WHERE id_perrera = ?', [req.params.id])
        res.json(rows)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las redes sociales de la perrera' })
    }
}

export const updateRedesSociales = async (req, res) => { //actualiza las redes sociales de una perrera
    try {
        await pool.query('UPDATE Redes_Sociales_Perrera SET instagram = ?, facebook = ?, twitter = ?, web = ? WHERE id_perrera = ?', [req.body.instagram, req.body.facebook, req.body.twitter, req.body.web, req.params.id])
        res.json({ mensaje: 'Redes sociales actualizadas correctamente' })
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar las redes sociales de la perrera' })
    }
}

export const addRedesSociales = async (req, res) => { //añade las redes sociales de una perrera
    try {
        await pool.query('INSERT INTO Redes_Sociales_Perrera (id_perrera, instagram, facebook, twitter, web) VALUES (?,?,?,?,?)', [req.params.id, req.body.instagram, req.body.facebook, req.body.twitter, req.body.web])
        res.json({ mensaje: 'Redes sociales añadidas correctamente' }) 
    } catch (error) {
        res.status(500).json({ message: 'Error al añadir las redes sociales de la perrera' })
    }
}

export const deleteRedesSociales = async (req, res) => { //elimina las redes sociales de una perrera
    try {
        await pool.query('DELETE FROM Redes_Sociales_Perrera WHERE id_perrera = ?', [req.params.id])
        res.json({ mensaje: 'Redes sociales eliminadas correctamente' })
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar las redes sociales de la perrera' })
    }
}

export const getDogs = async (req, res) => { //devuelve los perros de una perrera
    try {
        const [rows] = await pool.query('SELECT * FROM Mascotas JOIN Perrera_Mascotas ON Mascotas.id = Perrera_Mascotas.id_mascota WHERE Perrera_Mascotas.id_perrera = ?', [req.params.id])
        res.json(rows)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los perros de la perrera' })
    }
}

export const addDog = async (req, res) => { //añade un perro a una perrera
    try {
        await pool.query('INSERT INTO Perrera_Mascotas (id_perrera, id_mascota) VALUES (?,?)', [req.params.id, req.body.id_mascota])
        res.json({ mensaje: 'Perro añadido correctamente' })
    } catch (error) {
        res.status(500).json({ message: 'Error al añadir el perro a la perrera' })
    }
}

export const deleteDog = async (req, res) => { //elimina un perro de una perrera
    try {
        await pool.query('DELETE FROM Perrera_Mascotas WHERE id_perrera = ? AND id_mascota = ?', [req.params.id, req.body.id_mascota])
        res.json({ mensaje: 'Perro eliminado correctamente' })
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el perro de la perrera' })
    }
}
