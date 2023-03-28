import express from 'express';
import {checkPin,findShippingCharge,takeGuestOrder,takeMemberOrder,webHooks,getOrderDetail,createPromoCode,createCoupon,orderTest} from '../controller/orderController.js'
// import {protect} from '../middleware/authMiddleware.js';
import {orderReturn} from '../controller/returnOrder.js'
import {protect} from '../middleWare/authMiddleWare.js';


const router = express.Router();

router.post('/return',orderReturn)

router.post('/checkPin',checkPin);

router.post('/shippingCharge',findShippingCharge);
router.get('/orderDetail/:id',getOrderDetail)

router.post('/orderTest',orderTest);
router.post('/guestOrder',takeGuestOrder);


router.route('/createCoupon').post(createCoupon);
router.route('/createPromo').post(createPromoCode);
router.route('/memeberOrder').post(protect,takeMemberOrder);
router.route('/webhook').post( express.raw({type: 'application/json'}), webHooks);





export default router;