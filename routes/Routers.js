import express from 'express';
import { Register } from '../controllers/auth/register.js';
import { Login } from '../controllers/auth/LogIn.js';
import getUsers from '../controllers/users/getUsers.js';

const router = express.Router();

// router.post('/createtable', Createtable);
router.post('/register', Register);
router.post('/login', Login);
router.get('/users', getUsers);

export default router;
