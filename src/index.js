import express from 'express'
import YAML from 'yamljs'
import swaggerUi from 'swagger-ui-express';
import appRoutes from './routes/app.routes.js'
import userRoutes from './routes/usuarios.routes.js'
import mascotasRoutes from './routes/mascotas.routes.js'
import perreraRoutes from './routes/perrera.routes.js'


const app = express()
const usersYaml = YAML.load('./src/Yaml/api.yaml')
app.use('/', swaggerUi.serve, swaggerUi.setup(usersYaml))

app.use(express.json())

app.use(mascotasRoutes)
app.use(appRoutes)
app.use(userRoutes)
app.use(perreraRoutes)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' })
})

export default app;