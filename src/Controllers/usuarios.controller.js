
import { pool } from '../db.js'
import jwt from 'jsonwebtoken'


//devuelve todos los users
export const getUsers = async (req, res) => { //devuelve todos los usuarios
  try {
    const [rows] = await pool.query('SELECT * FROM Usuarios')
    res.json(rows)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
}

export const getUser = async (req, res) => { //devuelve un usuario
  try {
    const [rows] = await pool.query('SELECT * FROM Usuarios WHERE email = ?', [req.params.email])
    res.json(rows)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener usuario' });
  }
}


export const createUser = async (req, res) => { //crea un usuario
  const { nombre, email, pw, telefono } = req.body;
    if (req.nombre.body == null || req.email.body == null || req.pw.body == null || req.telefono.body == null) {
        return res.status(400).json({ msg: 'Faltan campos necesarios '})
    }
    //const query = 'SELECT * FROM Usuarios WHERE email = ?';
    await pool.query ('SELECT * FROM Usuarios WHERE email =?', [req.email.body], async (error, results) => { //comprueba si el email ya está registrado
    if (error) {
      console.error(error);
      return res.status(500).json({ mensaje: 'Error al registrar usuario' });
    }

    if (results.length > 0) {
      return res.status(409).json({ mensaje: 'El correo electrónico ya está registrado' });
    }
    //await pool.query('INSERT INTO Users (nombre, email, pw, telefono) VALUES (?,?,?,?)', [req.body.nombre, req.body.email, req.body.pw, req.body.telefono])   

    await pool.query('INSERT INTO Users (nombre, email, pw, telefono) VALUES (?,?,?,?)', [req.body.nombre, req.body.email, req.body.pw, req.body.telefono], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al registrar usuario' });
      }
      
      return res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    });
  });
};


export const updateFullUser = async (req, res) => { //actualiza un usuario de forma completa
  try {
    await pool.query('UPDATE Usuarios SET nombre = ?, email = ?, pw = ?, telefono = ? WHERE id = ?', [req.body.nombre, req.body.email, req.body.pw, req.body.telefono, req.params.id])
    res.json({ msg: 'Usuario actualizado' })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al actualizar usuario' });
  }
}

export const updateUser = async (req, res) => { //actualiza un usuario
  try {
    await pool.query('UPDATE Usuarios SET ? WHERE id = ?', [req.body, req.params.id])
    res.json({ msg: 'Usuario actualizado' })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al actualizar usuario' });
  }
}

export const deleteUser = async (req, res) => { //borra un usuario
  try {
    await pool.query('DELETE FROM Usuarios WHERE id = ?', [req.params.id])
    res.json({ msg: 'Usuario borrado' })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al borrar usuario' });
  }
}

export const login = async (req, res) => { //devuelve el token de un usuario
    const [rows] = await pool.query('SELECT * FROM Usuarios WHERE email = ? AND pw = ?', [req.body.email, req.body.pw])
    if (rows.length > 0) {
    const id = await pool.query('SELECT id FROM Usuarios WHERE email = ? AND pw = ?', [req.body.email, req.body.pw])
    const token = jwt.sign({ userId: id }, 'secreto', { expiresIn: '3h' });
    res.json({ auth: true, token: token });
    } else {
    res.json({ auth: false, token: null });
    }
}

export const likedDogs = async (req, res) => { //devuelve todos los perros que le gustan a un usuario
  try {
    const result = await pool.query('SELECT * FROM Mascotas JOIN Mascotas_Usuarios_Liked ON Mascotas.id = Mascotas_Usuarios_Liked.id_mascota WHERE Mascotas_Usuarios_Liked.id_user = ?', [req.params.id]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'El usuario no tiene perros que le gusten' });
  }
};

export const likeADog = async (req, res) => { //añade un perro a la lista de perros que le gustan a un usuario
  try {
    const result = await pool.query('INSERT INTO Mascotas_Usuarios_Liked (id_user, id_mascota) VALUES (?,?)', [req.params.id_user, req.params.id_mascota]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al dar like' });
  }
};

export const ownedDogs = async (req, res) => { //devuelve todos los perros que tiene un usuario
  try {
    const result = await pool.query('SELECT * FROM Mascotas JOIN Mascotas_Usuarios_Owned ON Mascotas.id = Mascotas_Usuarios_Owned.id_mascota WHERE Mascotas_Usuarios_Owned.id_user = ?', [req.params.id]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'El usuario no tiene perros'});
  }
};

export const ownADog = async (req, res) => { //añade un perro a la lista de perros que tiene un usuario
  try {
    const result = await pool.query('INSERT INTO Mascotas_Usuarios_Owned (id_user, id_mascota) VALUES (?,?)', [req.params.id_user, req.params.id_mascota]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al añadir mascota' });
  }
};

export const userStats = async (req, res) => { //devuelve las estadísticas de un usuario
  try {
    const result = await pool.query('SELECT * FROM Usuarios_Caracteristicas WHERE id_usuario = ?', [req.params.id]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'El usuario no tiene estadísticas asociadas'});
  } 
};

export const updateUserStats = async (req, res) => { //actualiza las estadísticas de un usuario, recibe id y los stats del perro
  try {
    const result = await pool.query('UPDATE Usuarios_Caracteristicas SET ? WHERE id_usuario = ?', [req.body, req.params.id]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar estadísticas' });
  }
};

export const logout = async (req, res) => { //cierra sesión
  res.json({ auth: false, token: null });
};

export const likedShelters = async (req, res) => { //devuelve todos los refugios que le gustan a un usuario
  try {
    const result = await pool.query('SELECT * FROM Perrera JOIN Usuarios_Perreras ON Perrera.id = Usuarios_Perreras.id_perrera WHERE Usuarios_Perreras.id_usuario = ?', [req.params.id]);
    res.status(200).json(result);
  }
  catch (error) {
    res.status(500).json({ message: 'Error, no hay ninguna perrera con likes' });
  }
};

export const likeAShelter = async (req, res) => { //añade un refugio a la lista de refugios que le gustan a un usuario
  try {
    const result = await pool.query('INSERT INTO Usuarios_Perreras (id_usuario, id_perrera) VALUES (?,?)', [req.params.id_usuario, req.params.id_perrera]);
    res.status(200).json(result);
  }
  catch (error) {
    res.status(500).json({ message: 'Error al dar like' });
  }
};


    
 
