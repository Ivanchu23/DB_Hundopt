import express from 'express'
import {pool} from './db.js'

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/ping', async (req, res) => {
    const result = await pool.query('SELECT "Hello world" AS RESULT')
    console.log(result)
})

app.get('/create', async (req, res) => {
    const [result] = await pool.query('INSERT INTO Mascotas (nombre, raza, ubicacion, peso, reservado) VALUES ("Max", "Golden Retriever", "Ciudad de México", 25.5, false)')
    res.json(result)
})

app.get('/deploy', async (req, res) => {
    const result = await pool.query('CREATE TABLE IF NOT EXISTS Mascotas  ( id INT AUTO_INCREMENT PRIMARY KEY,nombre VARCHAR(50) NOT NULL,raza VARCHAR(50) NOT NULL,ubicacion VARCHAR(255) NOT NULL,peso FLOAT NOT NULL,reservado BOOLEAN)')
})

app.get('/dogs', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM Mascotas')
    res.json(rows)
})




app.listen(3000)
console.log('Server on port', 3000)

