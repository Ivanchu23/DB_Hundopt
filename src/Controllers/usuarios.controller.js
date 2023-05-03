
import { pool } from '../db.js'
import jwt from 'jsonwebtoken'


//devuelve todos los users
export const getUsers = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM Users')
    res.json(rows)
}

export const getUser = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM Users WHERE id = ?', [req.params.id])
    res.json(rows)
}


export const createUser = async (req, res) => {
    const { nombre, email, pw, telefono } = req.body
    if (nombre == null || email == null || pw == null || telefono == null) {
        return res.status(400).json({ msg: 'Faltan campos necesarios '})
    }
    const query = 'SELECT * FROM usuarios WHERE email = ?';
  pool.query (query, [email], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ mensaje: 'Error al registrar usuario' });
    }

    if (results.length > 0) {
      return res.status(409).json({ mensaje: 'El correo electrónico ya está registrado' });
    }
    //await pool.query('INSERT INTO Users (nombre, email, pw, telefono) VALUES (?,?,?,?)', [req.body.nombre, req.body.email, req.body.pw, req.body.telefono])   

    const nuevoUsuario = { nombre, email, password, telefono };
    const insertQuery = 'INSERT INTO usuarios SET ?';
    pool.query(insertQuery, nuevoUsuario, (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al registrar usuario' });
      }
      
      return res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    });
  });
};


export const updateFullUser = async (req, res) => {
    await pool.query('UPDATE Users SET nombre = ?, email = ?, pw = ?, telefono = ? WHERE id = ?', [req.body.nombre, req.body.email, req.body.pw, req.body.telefono, req.params.id])
}

export const updateUser = async (req, res) => {
    await pool.query('UPDATE Users SET ? WHERE id = ?', [req.body, req.params.id])
}

export const deleteUser = async (req, res) => {
    await pool.query('DELETE FROM Users WHERE id = ?', [req.params.id])
}

export const login = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM Users WHERE email = ? AND pw = ?', [req.body.email, req.body.pw])
    if (rows.length > 0) {
    const token = jwt.sign({ userId: usuario.id }, 'secreto', { expiresIn: '3h' });
    res.json({ auth: true, token: token });
    } else {
    res.json({ auth: false, token: null });
    }
}