import {Router} from 'express';
import {getUsers, getUser, createUser, updateFullUser, deleteUser, updateUser, login, likedDogs, ownedDogs, updateUserStats, likeADog, ownADog, logout, userStats, likedShelters, likeAShelter} from '../Controllers/usuarios.controller.js';

const router = Router();

router.get('/users', getUsers) //devuelve todos los usuarios ok

router.get('/users/:email', getUser) //devuelve un usuario ok

router.post('/users', createUser)

router.put('/users/:id', updateFullUser) //actualiza un usuario de forma completa ok

router.delete('/users/:id', deleteUser)

router.patch('/users/:id', updateUser) //actualiza un usuario de forma parcial ok

router.post('/login', login) //devuelve el token ok

router.get('/users/likedDogs/:id', likedDogs) //devuelve los perros que le gustan a un usuario ok

router.put('/users/likeADog/:id_user/:id_mascota', likeADog) //añade un perro a la lista de perros que le gustan a un usuario ok

router.get('/users/ownedDogs/:id', ownedDogs) //devuelve los perros que tiene un usuario ok

router.put('/users/ownADog/:id_user/:id_mascota', ownADog) //añade un perro a la lista de perros que tiene un usuario ok

router.get('/users/userStats/:id', userStats) //devuelve las estadísticas de un usuario ok

router.put('/users/userStats/:id', updateUserStats)

router.post('/logout', logout)

router.get('/users/likedShelters/:id', likedShelters)

router.put('/users/likeAShelter/:id_user/:id_shelter', likeAShelter)


export default router;