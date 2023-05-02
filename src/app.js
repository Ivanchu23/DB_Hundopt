import express from 'express'
import appRoutes from './routes/app.routes.js'
import userRoutes from './routes/usuarios.routes.js'
import mascotasRoutes from './routes/mascotas.routes.js'

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World')
})


app.use(mascotasRoutes)
app.use(appRoutes)
app.use(userRoutes)


app.listen(3000)
console.log('Server on port', 3000)

