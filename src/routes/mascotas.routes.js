import { Router } from 'express'
import { createMascota, getMascotas, getMascota, deleteMascota, getMascotaStats, updateMascotaStats, deleteStat, updateMascota, getMascotaEnfermedades, addEnfermedad, deleteEnfermedad, getShelter, addShelter, deleteShelter, getFotos, addFoto, deleteFoto, getVideos, addVideo, deleteVideo} from '../Controllers/mascotas.controller.js'

const router = Router();



router.post('/mascotas', createMascota)

router.get('/mascotas', getMascotas)

router.get('/mascotas/getMascota/:id', getMascota)

router.delete('/mascotas/deleteMascota/:id', deleteMascota)

router.get('/mascotas/getMascotaStats/:id', getMascotaStats)

router.put('/mascotas/updateMascota/:id', updateMascota)

router.put('/mascotas/updateMascotaStats/:id', updateMascotaStats)

router.delete('/mascotas/deleteMascotaStat/:id', deleteStat)

router.get('/mascotas/getMascotaEnfermedades/:id', getMascotaEnfermedades)

router.put('/mascotas/addEnfermedad/:id', addEnfermedad)

router.delete('/mascotas/deleteEnfermedad/:id_mascota/:id_enfermedad', deleteEnfermedad)

router.get('/mascotas/shelter/:id', getShelter)

router.put('/mascotas/addShelter/:id_mascota/:id_shelter', addShelter)

router.delete('/mascotas/deleteShelter/:id_mascota/:id_shelter', deleteShelter)

router.get('/mascotas/fotos/:id', getFotos)

router.put('/mascotas/addFoto/:id_mascota/:id_foto', addFoto)

router.delete('/mascotas/deleteFoto/:id_mascota/:id_foto', deleteFoto)

router.get('/mascotas/getVideos/:id', getVideos)

router.put('/mascotas/addVideo/:id_mascota/:id_video', addVideo)

router.delete('/mascotas/deleteVideo/:id_mascota/:id_video', deleteVideo)



export default router;