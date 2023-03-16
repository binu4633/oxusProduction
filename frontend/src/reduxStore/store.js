import {configureStore} from '@reduxjs/toolkit';
import categoryAndSizeReducer  from './adminProduct/categoryAndSizeSlice';
import productUtilityReducer from './adminProduct/productUtils';
import adminColorReducer from './adminProduct/adminColorsSlice';
import adminProductReducer from './adminProduct/adminProductSlice';
import skuReducer from './adminProduct/skuSlice';
import adminCollectionReducer from './adminProduct/productCollectionSlice';
import fetchProductReducer from './user/fetchProductsSlice';
import fetchProdcutDetailReducer from './user/fetchProductDetailSlice';
import fetchImageReducer from './user/slideImageSlice';
import cartReducer  from './user/cartSlice';
import userReducer from './user/userSlice';
import uiReducer from './user/uiSlice';
import pinReducer from './user/pinSlice';
import shippingPinReducer from './user/pinShippingSlice';
import addressReducer from './user/addressSlice';
import paymentReducer from './user/paymentSlice';
import orderReducer from './adminProduct/ordersSlice';
import userAdminReducer from './adminProduct/userAdminSlice';
import profileReducer from './user/profileSlice'

export const store = configureStore({
    reducer:{
        category:categoryAndSizeReducer,
        productUtils:productUtilityReducer,
        adminColor:adminColorReducer,
        adminAddedProduct:adminProductReducer,
        sku:skuReducer,
        adminCollection:adminCollectionReducer,
        productFrontend:fetchProductReducer,
        productDetail:fetchProdcutDetailReducer,
        sliderImages:fetchImageReducer,
        cart:cartReducer,
        user:userReducer,
        ui:uiReducer,
        pin:pinReducer,
        shippingPin:shippingPinReducer,
        address:addressReducer,
        payment:paymentReducer,
        order:orderReducer,
        userAdmin:userAdminReducer,
        profile:profileReducer
    }
})