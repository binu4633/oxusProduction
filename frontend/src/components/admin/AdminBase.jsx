import React from 'react'
import {Outlet} from 'react-router-dom'
import classes from './AdminBase.module.css';
import AdminMenu from './AdminMenu';
function AdminBase() {
  return (
    <div className={classes.base}>
       
        <AdminMenu />
        <div className={classes.outlet}>

        <Outlet />
        </div>
    {/* <AdminResult /> */}
   </div>
  )
}

export default AdminBase
