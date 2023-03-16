import React from 'react'
import classes from './Loader.module.css'
function Loader() {
  return (
    <div className={classes.base}>
      <div className={classes.load_wrapper}>
        <div className={classes.loadOne}>
        <div className={classes.loadOne_wheel}>
            <div className={classes.circleOne}></div>
            <div className={classes.circleOne_half}></div>
        </div>  
        <div className={classes.loadOne_wheel_half}>
        </div>  
       </div>
        <div className={classes.loadTwo}>
        <div className={classes.loadTwo_wheel}>
            <div className={classes.circleTwo}></div>
            <div className={classes.circleTwo_half}></div>
        </div>  
        <div className={classes.loadTwo_wheel_half}>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Loader
