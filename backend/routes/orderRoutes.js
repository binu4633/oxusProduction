import express from 'express';
import {checkPin,findShippingCharge,takeGuestOrder,takeMemberOrder,webHooks,getOrderDetail,createPromoCode,createCoupon,orderTest} from '../controller/orderController.js'
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/checkPin',checkPin);

router.post('/shippingCharge',findShippingCharge);
router.get('/orderDetail/:id',getOrderDetail)

router.post('/orderTest',orderTest);
router.post('/guestOrder',takeGuestOrder);


router.route('/createCoupon').post(createCoupon);
router.route('/createPromo').post(createPromoCode);
router.post('/memeberOrder',protect,takeMemberOrder);
router.route('/webhook').post( express.raw({type: 'application/json'}), webHooks);





export default router;