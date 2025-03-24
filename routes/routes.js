import express from 'express';
import { Register } from '../controllers/register.js';



const router = express.Router()
router.get('/register', Register)


export default router // exports routers