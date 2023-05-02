
export const createMascota = async (req, res) => {const [result] = await pool.query('INSERT INTO Mascotas (nombre, raza, ubicacion, peso, reservado) VALUES ("Max", "Golden Retriever", "Ciudad de México", 25.5, false)')
    res.json(result)
}

export const getMascotas = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM Mascotas')
    res.json(rows)
}