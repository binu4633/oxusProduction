import express from 'express';

const router = express.Router();

import {findOrders,getOrderDetail} from '../controller/orderControllerAdmin.js';
import {protect} from '../middleWare/authMiddleWare.js'


router.get('/orders',protect, findOrders)
router.get('/orderDetail/:id',protect,getOrderDetail)

export default router;