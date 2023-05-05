import { Router } from 'express'
import{ getPerreras, getPerrera, createPerrera, updatePerrera, deletePerrera, getUsuariosLiked, getRedesSociales, addRedesSociales, updateRedesSociales, deleteRedesSociales, getDogs, addDog, deleteDog} from '../Controllers/perrera.controller.js'

const router = Router()

router.get('/perrera', getPerreras)

router.get('/perrera/:id', getPerrera)

router.post('/perrera', createPerrera)

router.put('/perrera/:id', updatePerrera)

router.delete('/perrera/:id', deletePerrera)

router.get('/perrera/usuariosLiked/:id', getUsuariosLiked)

router.get('/perrera/redesSociales/:id', getRedesSociales)

router.post('/perrera/redesSociales/:id', addRedesSociales)

router.put('/perrera/redesSociales/:id', updateRedesSociales)

router.delete('/perrera/redesSociales/:id', deleteRedesSociales)

router.get('perrera/dogs/:id', getDogs)

router.post('perrera/dogs/:id', addDog)

router.delete('perrera/dogs/:id', deleteDog)


export default router;
