import React from 'react'
import {Link,Outlet} from 'react-router-dom';
import classes from './AdminProductPage.module.css'
function AdminProductPage() {
  return (
    <div className={classes.wrapper}>
        {/* <span className={classes.links}>
          <Link to='/auth/admin/product/products' >products </Link>
        </span>
        <span className={classes.links}>
          <Link to='/auth/admin/product/addProducts' >add products </Link>
        </span>
        <span className={classes.links}>
          <Link to='/auth/admin/product/sku' >add sku </Link>
        </span>
        <span className={classes.links}>
          <Link to='/auth/admin/product/addColors' >add color </Link>
        </span>
        <span className={classes.links}>
          <Link to='/auth/admin/product/addProductbase' >General </Link>
        </span> */}
     
     <Outlet />
    </div>
  )
}

export default AdminProductPage
