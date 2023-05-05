import {Router} from 'express';
import {getUsers, getUser, createUser, updateFullUser, deleteUser, updateUser, login, likedDogs, ownedDogs, updateUserStats, likeADog, ownADog, logout, userStats, likedShelters, likeAShelter} from '../Controllers/usuarios.controller.js';

const router = Router();

router.get('/users ', getUsers)

router.get('/users/:id', getUser)

router.post('/users', createUser)

router.put('/users/:id', updateFullUser)

router.delete('/users/:id', deleteUser)

router.patch('/users/:id', updateUser)

router.get('/login', login)

router.get('/users/likedDogs/:id', likedDogs)

router.put('/users/likeADog/:id_user/:id_mascota', likeADog)

router.get('/users/ownedDogs/:id', ownedDogs)

router.put('/users/ownADog/:id_user/:id_mascota', ownADog)

router.get('/users/userStats/:id', userStats)

router.put('/users/userStats/:id', updateUserStats)

router.post('/logout', logout)

router.get('/users/likedShelters/:id', likedShelters)

router.put('/users/likeAShelter/:id_user/:id_shelter', likeAShelter)


export default router;