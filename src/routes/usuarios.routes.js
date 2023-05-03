import {Router} from 'express';
import {getUsers, getUser, createUser, updateFullUser, deleteUser, updateUser} from '../Controllers/usuarios.controller.js';

const router = Router();

router.get('/users ', getUsers)

router.get('/users/:id', getUser)

router.post('/users', createUser)

router.put('/users/:id', updateFullUser)

router.delete('/users/:id', deleteUser)

router.patch('/users/:id', updateUser)

router.get('/login', login)


export default router;