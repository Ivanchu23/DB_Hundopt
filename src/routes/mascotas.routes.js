import { Router } from 'express'
import { createMascota, getMascotas, getMascota, deleteMascota, getMascotaStats, updateMascotaStats, deleteStat, updateMascota, getMascotaEnfermedades, addEnfermedad, deleteEnfermedad, getShelter, addShelter, deleteShelter, getFotos, addFoto, deleteFoto, getVideos, addVideo, deleteVideo, getEnfermedades, getCaracteristicasTotal, addEnfermedadTotal, addCaracteristicaTotal, deleteEnfermedadTotal, deleteCaracteristicaTotal} from '../Controllers/mascotas.controller.js'

const router = Router();



router.post('/mascotas', createMascota) // Crear una mascota ok

router.get('/mascotas', getMascotas) // Obtener todas las mascotas ok

router.get('/mascotas/:id', getMascota) // Obtener una mascota ok

router.delete('/mascotas/deleteMascota/:id', deleteMascota) // Eliminar una mascota ok

router.get('/mascotas/getMascotaStats/:id', getMascotaStats) // Obtener los stats de una mascota ok

router.put('/mascotas/updateMascota/:id', updateMascota) // Actualizar una mascota ok

router.post('/mascotas/updateMascotaStats', updateMascotaStats) // nuevas fucniona, viejas no

router.delete('/mascotas/deleteMascotaStat/:id', deleteStat) // Eliminar una stat de una mascota ok

router.get('/mascotas/getMascotaEnfermedades/:id', getMascotaEnfermedades) // Obtener las enfermedades de una mascota ok

router.put('/mascotas/addEnfermedad/:id', addEnfermedad)    // Agregar una enfermedad a una mascota ok

router.delete('/mascotas/deleteEnfermedad/:id_mascota/:id_enfermedad', deleteEnfermedad) // Eliminar una enfermedad de una mascota ok

router.get('/mascotas/shelter/:id', getShelter) // Obtener el shelter de una mascota ok

router.put('/mascotas/addShelter/', addShelter) // Agregar un shelter a una mascota ok

router.delete('/mascotas/deleteShelter/:id_mascota/:id_shelter', deleteShelter) // Eliminar un shelter de una mascota ok

router.get('/mascotas/fotos/:id', getFotos) // Obtener las fotos de una mascota ok

router.put('/mascotas/addFoto/:id_mascota', addFoto) // Agregar una foto a una mascota ok

router.delete('/mascotas/deleteFoto/:id_mascota/:id_foto', deleteFoto)  // Eliminar una foto de una mascota ok

router.get('/mascotas/getVideos/:id', getVideos) // Obtener los videos de una mascota ok

router.put('/mascotas/addVideo/:id_mascota/:id_video', addVideo) // Agregar un video a una mascota ok

router.delete('/mascotas/deleteVideo/:id_mascota/:id_video', deleteVideo) // Eliminar un video de una mascota ok

router.get('/mascotas/enfermedades', getEnfermedades)

router.post('/mascotas/addEnfermedad', addEnfermedadTotal) // Agregar una enfermedad a una mascota ok

router.delete('/mascotas/deleteEnfermedadTotal/:id_enfermedad', deleteEnfermedadTotal) // Eliminar una enfermedad de una mascota ok

router.get('/mascotas/caracteristicas', getCaracteristicasTotal) 

router.post('/mascotas/addCaracteristica', addCaracteristicaTotal) // Agregar una enfermedad a una mascota ok

router.delete('/mascotas/deleteCaracteristica/:id_mascota/:id_caracteristica', deleteCaracteristicaTotal)    // Eliminar una enfermedad de una mascota ok






export default router;