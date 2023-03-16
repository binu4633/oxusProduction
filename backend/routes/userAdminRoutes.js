import express from 'express';
import {getUsers,getUserDetail,testUser} from '../controller/userAdmin.js';
import {protect} from '../middleWare/authMiddleWare.js'
const router = express.Router();

router.get('/users',protect, getUsers);
router.get('/user/:id',protect, getUserDetail);
// router.get('/testUser', testUser);

export default router;