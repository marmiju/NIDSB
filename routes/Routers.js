import express from 'express';
import { Register } from '../controllers/auth/register.js';
import { Login } from '../controllers/auth/LogIn.js';
import { authenticateToken } from '../controllers/auth/midleWare.js';



const router = express.Router()
router.post('/register', Register)
router.post('/login', Login)


export default router // exports routers