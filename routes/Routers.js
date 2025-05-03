import express from 'express';
import { Register } from '../controllers/auth/register.js';
import { Login } from '../controllers/auth/LogIn.js';
import getUsers from '../controllers/users/getUsers.js';
import CreateContest from '../controllers/contest/CreateContest.js';
import GetContest from '../controllers/contest/GetContest.js';
import GetOne from '../controllers/contest/GetOne.js';
import Submit from '../controllers/contest/Submit.js';
import GetContestRanking from '../controllers/contest/ContestRanking.js';

const router = express.Router();

// router.post('/createtable', Createtable);
router.post('/register', Register);
router.post('/login', Login);
router.post('/users', getUsers);
router.post('/contest', CreateContest)
router.get('/contest', GetContest)
router.post('/onecontest', GetOne)

// Submission Code
router.post('/submit', Submit)
// Contest Ranking
router.post('/contestRanking',GetContestRanking)


export default router;
