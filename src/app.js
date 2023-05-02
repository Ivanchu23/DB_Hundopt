import express from 'express'
import appRoutes from './routes/app.routes.js'
import userRoutes from './routes/usuarios.routes.js'
import mascotasRoutes from './routes/mascotas.routes.js'

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World')
})
app.use(express.json())

app.use('/hundopt/api',mascotasRoutes)
app.use('hundopt/api',appRoutes)
app.use('hundopt/api',userRoutes)


app.listen(3000)
console.log('Server on port', 3000)

