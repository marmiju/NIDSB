const express = require('express');

const Register = require('../controllers/auth/register');
const Login = require('../controllers/auth/LogIn');
const getUsers = require('../controllers/users/getUsers');
const CreateContest = require('../controllers/contest/CreateContest');
const GetContest = require('../controllers/contest/GetContest');
const GetOne = require('../controllers/contest/GetOne');
const Submit = require('../controllers/contest/Submit');
const GetContestRanking = require('../controllers/contest/ContestRanking');
const inserSocialMedia = require('../controllers/InfoData/addSocial');
const getInfo = require('../controllers/InfoData/getInfoData');
const getNotices = require('../controllers/notice/Getnotice');
const getAbout = require('../controllers/aboutData/getAboutData');
const AddNotice = require('../controllers/notice/AddNotice');

const router = express.Router();

// router.post('/createtable', Createtable);
router.post('/register', Register);
router.post('/login', Login);
router.post('/users', getUsers);
router.post('/contest', CreateContest);
router.get('/contest', GetContest);
router.post('/onecontest', GetOne);

// Submission Code
router.post('/submit', Submit);

// Contest Ranking
router.post('/contestRanking', GetContestRanking);

// Social Media
router.post('/addSocial', inserSocialMedia);
router.get('/getinfo', getInfo);

// Notices
router.post('/addnotice', AddNotice);
router.get('/getnotices', getNotices);

// About Info
router.get('/getabout', getAbout);

module.exports = router;
