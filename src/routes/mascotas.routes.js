import { Router } from 'express'
import { createMascota, getMascotas, getMascota } from '../Controllers/mascotas.controller.js'

const router = Router();



router.post('/createMascota', createMascota)

router.get('/showMascotas', getMascotas)

router.get('/getMascota/:id', getMascota)


export default router;