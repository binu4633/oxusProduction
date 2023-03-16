import express from "express";

const router = express.Router();

import {
    // addProduct,
    // getAllProducts,
    // getProductById,
    addCategory,
    showCategory,
    addSizes,
    showSizes,
    deleteCategory,
    updateSizes,
    deleteSize,
    findSize
    // findProductName,
    // findProductToAddSku,
    // addSku,
    // addImages ,
    // findImageColors,
    // addDefaultImages,
    // findSliderImage 
  } from "../controller/categoryAndSizeController.js";
  // import {protect} from '../middleware/authMiddleware.js';
  import {protect} from '../../backend/middleWare/authMiddleWare.js';

router.route("/getcategory").get(showCategory);
router.route("/category").post(protect, addCategory);
router.route("/category/:id").delete(protect,deleteCategory);
router.route('/showSizes').get(showSizes)
router.route('/addSizes').post(protect,addSizes)// create a comma seperated string
router.route('/updateSizes/:id').put(protect,updateSizes)
router.route('/deleteSizes/:id').delete(protect,deleteSize)
router.route('/findSize/:id').get(findSize)

export default router;