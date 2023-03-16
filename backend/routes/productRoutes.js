import express from "express";

const router = express.Router();

import {
  addProduct,
  updateProductColor,
  findProductName,
  findProductForColors,
  addColors,
  updateColor,
  deleteColor
} from "../controller/productController.js";


import {adminCollection,updateProduct} from '../controller/adminProductsController.js'


import {addSku,updateSku,deleteSku} from '../controller/productControllerSku.js';

import {fetchProductUser,fetchProductDetail,fetchSliderImages,testProducts} from '../controller/productControllerUser.js';
import {protect} from '../middleWare/authMiddleWare.js'

router.route("/addProduct").post(protect,addProduct);
router.route("/findProductName").post(protect,findProductName);
router.route("/findProductForColors").post(protect,findProductForColors);
router.route("/addColors/:id").post(protect,addColors);
router.route("/updateColors/:id").post(protect,updateColor);
router.route("/deleteColor/:id").post(protect,deleteColor);
router.route("/updateProduct/:id").put(protect,updateProductColor);
router.route('/updateProductDetail/:id').patch(protect,updateProduct);



router.route('/addSku/:id').post(protect,addSku);
router.route('/updateSku/:id').post(protect,updateSku);
router.route('/deleteSku/:id').post(protect,deleteSku);

router.route('/adminCollection').get(protect,adminCollection);

router.route('/fechProducts').get(fetchProductUser);
router.route('/fetchProductDetail/:id').get(fetchProductDetail);
router.route('/fetchImages/:id').get(fetchSliderImages);
router.route('/fechTestProducts').get(testProducts);


export default router;
