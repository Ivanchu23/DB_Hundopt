import { Router } from 'express'
import { createMascota, getMascotas } from '../Controllers/mascotas.controller.js'

const router = Router();



router.get('/createMascota', createMascota)

router.get('/showMascotas', getMascotas)




export default router;