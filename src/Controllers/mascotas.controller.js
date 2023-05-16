import { pool } from '../db.js'


export const createMascota = async (req, res) => { // Crear una mascota
    try {
        await pool.query('INSERT INTO Mascotas (nombre, raza, ubicacion, peso, reservado) VALUES (?,?,?,?,?)', [req.body.nombre, req.body.raza, req.body.ubicacion, req.body.peso, req.body.reservado])
        res.json({ mensaje: 'Mascota creada correctamente' })
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la mascota' });
    }
}


export const getMascotas = async (req, res) => {// Obtener todas las mascotas
    try {
        const [rows] = await pool.query('SELECT * FROM Mascotas')
        res.json(rows)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las mascotas'});
    }

}

export const getMascota = async (req, res) => {// Obtener una mascota
    try {
        const [rows] = await pool.query('SELECT * FROM Mascotas WHERE id = ?', [req.params.id])
        res.json(rows)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la mascota'});
    }
}

export const deleteMascota = async (req, res) => {// Eliminar una mascota
    try {
        await pool.query('DELETE FROM Mascotas WHERE id = ?', [req.params.id])
        res.json({ mensaje: 'Mascota eliminada correctamente' })
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la mascota'});
    }
}

export const getMascotaStats = async (req, res) => { // Obtener las estadísticas de una mascota
    try {
      const [rows] = await pool.query('SELECT DISTINCT c.nombre FROM Mascotas_Caracteristicas mc JOIN Caracteristicas c ON mc.id_caracteristica = c.id WHERE mc.id_mascota = ?', [req.params.id]);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las estadísticas de la mascota' });
    }
  };
  
  export const updateMascotaStats = async (req, res) => {
    try {
      const { id_mascota, id_caracteristicas } = req.body;
  
      // Obtener las características existentes de la mascota
      const existingCharacteristics = await pool.query('SELECT id_caracteristica FROM Mascotas_Caracteristicas WHERE id_mascota = ?', [id_mascota]);
      const existingIds = existingCharacteristics.map(row => row.id_caracteristica);
  
      // Filtrar las características nuevas que no están en las existentes
      const newIds = id_caracteristicas.filter(id => !existingIds.includes(id));
  
      // Verificar si no hay nuevas características para insertar
      if (newIds.length == 0) {
        return res.json({ message: 'Las características ya están asociadas a la mascota' });
      }else{
        const values = newIds.map(id => [id_mascota, id]);
  
        // Insertar las nuevas características en la tabla
        await pool.query('INSERT INTO Mascotas_Caracteristicas (id_mascota, id_caracteristica) VALUES ?', [values]);
    
        res.json({ message: 'Estadísticas de la mascota actualizadas correctamente' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar las estadísticas de la mascota' });
    }
  };
  

export const deleteStat = async (req, res) => { // Eliminar una estadística de una mascota
    try {
        await pool.query('DELETE FROM Mascotas_Caracteristicas WHERE id_mascota = ? AND id_caracteristica = ?', [req.params.id, req.body.id_caracteristica])
        res.json({ mensaje: 'Estadística eliminada correctamente' })
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la estadística de la mascota'});
    }
}

export const updateMascota = async (req, res) => { // Actualizar una mascota
    try {
        await pool.query('UPDATE Mascotas SET nombre = ?, raza = ?, ubicacion = ?, peso = ?, reservado = ? WHERE id = ?', [req.body.nombre, req.body.raza, req.body.ubicacion, req.body.peso, req.body.reservado, req.params.id])
        res.json({ mensaje: 'Mascota actualizada correctamente' })
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la mascota'});
    }
}

export const getMascotaEnfermedades = async (req, res) => { // Obtener las enfermedades de una mascota
    try{
        const [rows] = await pool.query('SELECT Enfermedades.nombre FROM Mascotas INNER JOIN Mascotas_Enfermedades ON id_mascota = Mascotas_Enfermedades.id_mascota INNER JOIN Enfermedades ON Mascotas_Enfermedades.id_enfermedad = Enfermedades.id WHERE Mascotas.id = ?', [req.params.id])
        res.json(rows)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las enfermedades de la mascota'});
    }
}

export const addEnfermedad = async (req, res) => { // Añadir una enfermedad a una mascota
    try{
        await pool.query('INSERT INTO Mascotas_Enfermedades (id_mascota, id_enfermedad) VALUES (?,?)', [req.params.id, req.body.id_enfermedad])
        res.json({ mensaje: 'Enfermedad añadida correctamente' })
    } catch (error) {
        res.status(500).json({ message: 'Error al añadir la enfermedad a la mascota'});
    }
}

export const deleteEnfermedad = async (req, res) => { // Eliminar una enfermedad de una mascota
    try{
        await pool.query('DELETE FROM Mascotas_Enfermedades WHERE id_mascota = ? AND id_enfermedad = ?', [req.params.id, req.body.id_enfermedad])
        res.json({ mensaje: 'Enfermedad eliminada correctamente' })
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la enfermedad de la mascota'});
    }
}

export const getShelter = async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM Perrera INNER JOIN Perrera_Mascotas ON Perrera.id = Perrera_Mascotas.id_perrera WHERE Perrera_Mascotas.id_mascota = ?', [req.params.id]);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el refugio de la mascota' });
    }
  };
  

export const addShelter = async (req, res) => { // Añadir una mascota a un refugio
    try{
        await pool.query('INSERT INTO Perrera_Mascotas (id_perrera, id_mascota) VALUES (?,?)', [req.params.id, req.body.id_mascota])
        res.json({ mensaje: 'Mascota añadida correctamente' })
    } catch (error) {
        res.status(500).json({ message: 'Error al añadir la mascota al refugio'});
    }
}

export const deleteShelter = async (req, res) => { // Eliminar una mascota de un refugio
    try{
        await pool.query('DELETE FROM Perrera_Mascotas WHERE id_perrera = ? AND id_mascota = ?', [req.params.id, req.body.id_mascota])
        res.json({ mensaje: 'Mascota eliminada correctamente' })
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la mascota del refugio'});
    }
}

export const getFotos = async (req, res) => { // Obtener las fotos de una mascota
    try {
        const [rows] = await pool.query('SELECT * FROM FotosMascotas WHERE id_mascota = ?', [req.params.id])
        res.json(rows)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las fotos de la mascota'});
    }
}

export const addFoto = async (req, res) => { // Añadir una foto a una mascota
    try {
        await pool.query('INSERT INTO FotosMascotas (id_mascota, url) VALUES (?,?)', [req.params.id, req.body.url])
        res.json({ mensaje: 'Foto añadida correctamente' })
    } catch (error) {
        res.status(500).json({ message: 'Error al añadir la foto a la mascota'});
    }
}

export const deleteFoto = async (req, res) => { // Eliminar una foto de una mascota
    try {
        await pool.query('DELETE FROM FotosMascotas WHERE id_mascota = ? AND url = ?', [req.params.id, req.body.url])
        res.json({ mensaje: 'Foto eliminada correctamente' })
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la foto de la mascota'});
    }
}

export const getVideos = async (req, res) => { // Obtener los videos de una mascota
    try {
        const [rows] = await pool.query('SELECT * FROM VideosMascotas WHERE id_mascota = ?', [req.params.id])
        res.json(rows)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los videos de la mascota'});
    }
}

export const addVideo = async (req, res) => { // Añadir un video a una mascota
    try {
        await pool.query('INSERT INTO VideosMascotas (id_mascota, url) VALUES (?,?)', [req.params.id, req.body.url])
        res.json({ mensaje: 'Video añadido correctamente' })
    } catch (error) {
        res.status(500).json({ message: 'Error al añadir el video a la mascota'});
    }
}

export const deleteVideo = async (req, res) => { // Eliminar un video de una mascota
    try {
        await pool.query('DELETE FROM VideosMascotas WHERE id_mascota = ? AND url = ?', [req.params.id, req.body.url])
        res.json({ mensaje: 'Video eliminado correctamente' })
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el video de la mascota'});
    }
}

    
    
    
    
    
    