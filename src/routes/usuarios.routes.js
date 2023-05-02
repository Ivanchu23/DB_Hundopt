import {Router} from 'express';

const router = Router();

router.get('/users ', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM Mascotas')
    res.json(rows)
})



export default router;