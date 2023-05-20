import { Router } from 'express'
import{ getPerreras, getPerrera, createPerrera, updatePerrera, deletePerrera, getUsuariosLiked, getRedesSociales, addRedesSociales, updateRedesSociales, deleteRedesSociales, getDogs, addDog, deleteDog} from '../Controllers/perrera.controller.js'

const router = Router()

router.get('/perrera', getPerreras) //devuelve todas las perreras ok

router.get('/perrera/:id', getPerrera)//devuelve una perrera ok

router.post('/perrera', createPerrera)  //crea una perrera ok

router.put('/perrera/:id', updatePerrera) //actualiza una perrera ok

router.delete('/perrera/:id', deletePerrera) //elimina una perrera ok

//router.get('/perrera/usuariosLiked/:id', getUsuariosLiked)

router.get('/perrera/redesSociales/:id', getRedesSociales) //devuelve las redes sociales de una perrera ok

router.post('/perrera/redesSociales/:id', addRedesSociales) //añade las redes sociales de una perrera ok

router.put('/perrera/redesSociales/:id', updateRedesSociales) //actualiza las redes sociales de una perrera ok

router.delete('/perrera/redesSociales/:id', deleteRedesSociales)//elimina las redes sociales de una perrera ok

router.get('perrera/dogs/:id', getDogs)

router.post('perrera/dogs/:id', addDog)

router.delete('perrera/dogs/:id', deleteDog)


export default router;
