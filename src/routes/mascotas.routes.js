import { Router } from 'express'
import { createMascota, getMascotas, getMascota, deleteMascota, getMascotaStats, updateMascotaStats, updateMascota, getMascotaEnfermedades, addEnfermedad} from '../Controllers/mascotas.controller.js'

const router = Router();



router.post('mascotas/createMascota', createMascota)

router.get('mascotas/showMascotas', getMascotas)

router.get('mascotas/getMascota/:id', getMascota)

router.delete('mascotas/deleteMascota/:id', deleteMascota)

router.get('mascotas/getMascotaStats/:id', getMascotaStats)

router.put('mascotas/updateMascota/:id', updateMascota)

router.put('mascotas/updateMascotaStats/:id', updateMascotaStats)

router.get('mascotas/getMascotaEnfermedades/:id', getMascotaEnfermedades)

router.put('mascotas/addEnfermedad/:id', addEnfermedad)





export default router;