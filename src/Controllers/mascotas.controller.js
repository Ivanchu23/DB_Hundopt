import { pool } from '../db.js'


export const createMascota = async (req, res) => { // Crear una mascota
    await pool.query('INSERT INTO Mascotas (nombre, raza, ubicacion, peso, reservado) VALUES (?,?,?,?,?)', [req.body.nombre, req.body.raza, req.body.ubicacion, req.body.peso, req.body.reservado])
    res.json({ mensaje: 'Mascota creada correctamente' })
}


export const getMascotas = async (req, res) => {// Obtener todas las mascotas
    const [rows] = await pool.query('SELECT * FROM Mascotas')
    res.json(rows)
}

export const getMascota = async (req, res) => {// Obtener una mascota
    const [rows] = await pool.query('SELECT * FROM Mascotas WHERE id = ?', [req.params.id])
    res.json(rows)
}

export const deleteMascota = async (req, res) => {// Eliminar una mascota
    await pool.query('DELETE FROM Mascotas WHERE id = ?', [req.params.id])
}

export const getMascotaStats = async (req, res) => { // Obtener las estadísticas de una mascota
    const [rows] = await pool.query('SELECT * FROM Estadisticas_Mascotas WHERE id_mascota = ?', [req.params.id])
    res.json(rows)
}

export const updateMascotaStats = async (req, res) => { // Actualizar las estadísticas de una mascota
    
    try {
        // Obtener las características actuales de la mascota
        const oldStats = await pool.query('SELECT * FROM mascotas_caracteristicas WHERE mascota_id = ?', [req.params.id]);
        const actuales = oldStats.map(res => res.id_caracteristica);
    
        // Filtrar las nuevas características que no estén ya en la base de datos
        const paraAgregar = req.body.caracteristicas.filter(caracteristica => !actuales.includes(caracteristica));
    
        // Agregar las nuevas características a la tabla mascotas_caracteristicas
        paraAgregar.forEach(async caracteristica => {
          await pool.query('INSERT INTO Mascotas_Caracteristicas (mascota_id, id_caracteristica) VALUES (?,?)', [req.params.id, caracteristica]);
        });
    
        res.status(200).json({ mensaje: 'Características de mascota actualizadas correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar las características de mascota' });
    }
};

export const deleteStat = async (req, res) => { // Eliminar una estadística de una mascota
    await pool.query('DELETE FROM Estadisticas_Mascotas WHERE id_mascota = ? AND id_estadistica = ?', [req.params.id, req.body.id_estadistica])
    res.json({ mensaje: 'Estadística eliminada correctamente' })
}

export const updateMascota = async (req, res) => { // Actualizar una mascota
    await pool.query('UPDATE Mascotas SET nombre = ?, raza = ?, ubicacion = ?, peso = ?, reservado = ? WHERE id = ?', [req.body.nombre, req.body.raza, req.body.ubicacion, req.body.peso, req.body.reservado, req.params.id])
    res.json({ mensaje: 'Mascota actualizada correctamente' })
}

export const getMascotaEnfermedades = async (req, res) => { // Obtener las enfermedades de una mascota
    const [rows] = await pool.query('SELECT enfermedades.nombre FROM Mascotas INNER JOIN Mascotas_Enfermedades ON id_mascota = Mascotas_Enfermedades.id_mascota INNER JOIN Enfermedades ON Mascotas_Enfermedades.id_enfermedad = Enfermedades.id WHERE Mascotas.id = ?', [req.params.id])
    res.json(rows)
}

export const addEnfermedad = async (req, res) => { // Añadir una enfermedad a una mascota
    await pool.query('INSERT INTO Mascotas_Enfermedades (id_mascota, id_enfermedad) VALUES (?,?)', [req.params.id, req.body.id_enfermedad])
    res.json({ mensaje: 'Enfermedad añadida correctamente' })
}

export const deleteEnfermedad = async (req, res) => { // Eliminar una enfermedad de una mascota
    await pool.query('DELETE FROM Mascotas_Enfermedades WHERE id_mascota = ? AND id_enfermedad = ?', [req.params.id, req.body.id_enfermedad])
    res.json({ mensaje: 'Enfermedad eliminada correctamente' })
}

 export const getShelter = async (req, res) => { // Obtener el refugio de una mascota
    const [rows] = await pool.query('`SELECT * FROM Perrera INNER JOIN Perrera_Mascotas ON Perrera.id = Perrera_Mascotas.id_perrera WHERE Perrera_mascotas.id_mascota = ?', [req.params.id])
    res.json(rows)
}

export const addShelter = async (req, res) => { // Añadir una mascota a un refugio
    await pool.query('INSERT INTO Perrera_Mascotas (id_perrera, id_mascota) VALUES (?,?)', [req.params.id, req.body.id_mascota])
    res.json({ mensaje: 'Mascota añadida correctamente' })
}

export const deleteShelter = async (req, res) => { // Eliminar una mascota de un refugio
    await pool.query('DELETE FROM Perrera_Mascotas WHERE id_perrera = ? AND id_mascota = ?', [req.params.id, req.body.id_mascota])
    res.json({ mensaje: 'Mascota eliminada correctamente' })
}

export const getFotos = async (req, res) => { // Obtener las fotos de una mascota
    const [rows] = await pool.query('SELECT * FROM FotosMascotas WHERE id_mascota = ?', [req.params.id])
    res.json(rows)
}

export const addFoto = async (req, res) => { // Añadir una foto a una mascota
    await pool.query('INSERT INTO FotosMascotas (id_mascota, url) VALUES (?,?)', [req.params.id, req.body.url])
    res.json({ mensaje: 'Foto añadida correctamente' })
}

export const deleteFoto = async (req, res) => { // Eliminar una foto de una mascota
    await pool.query('DELETE FROM FotosMascotas WHERE id_mascota = ? AND url = ?', [req.params.id, req.body.url])
    res.json({ mensaje: 'Foto eliminada correctamente' })
}

export const getVideos = async (req, res) => { // Obtener los videos de una mascota
    const [rows] = await pool.query('SELECT * FROM VideosMascotas WHERE id_mascota = ?', [req.params.id])
    res.json(rows)
}

export const addVideo = async (req, res) => { // Añadir un video a una mascota
    await pool.query('INSERT INTO VideosMascotas (id_mascota, url) VALUES (?,?)', [req.params.id, req.body.url])
    res.json({ mensaje: 'Video añadido correctamente' })
}

export const deleteVideo = async (req, res) => { // Eliminar un video de una mascota
    await pool.query('DELETE FROM VideosMascotas WHERE id_mascota = ? AND url = ?', [req.params.id, req.body.url])
    res.json({ mensaje: 'Video eliminado correctamente' })
}

    
    
    
    
    
    