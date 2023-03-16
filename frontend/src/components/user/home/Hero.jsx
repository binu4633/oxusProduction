import React from 'react';
import classes from './Hero.module.css';
import bgImage from '../../../imageCl/bg.jpg'
import blob1 from '../../../imageCl/blob1.png'
import blob2 from '../../../imageCl/blob2.png'
import blob3 from '../../../imageCl/blob3.png'
import blob4 from '../../../imageCl/blob4.png'



function Hero() {
  return (
    <div className={classes.hero__wrapper}>
{/*         
        <div className={classes.blob__wrapper}>
           <div className={classes.bl1}>
            <img src={blob1} alt="" />
           </div>
           <div className={classes.bl2}>
            <img src={blob2} alt="" />
           </div>
           <div className={classes.bl3}>
            <img src={blob3} alt="" />
           </div>
           <div className={classes.bl4}>
            <img src={blob4} alt="" />
           </div>
        </div> */}
        <div className={classes.heading__wrapper}>
            <div className={classes.hero__heading_wrapper}>
            <h1 className={classes.hero_1}>Oxus </h1>
            <h1 className={classes.hero_1}>Colletions</h1>
            <p className={classes.hero_2}>Create your own tredz</p>
            </div>
        </div>
        <div className={classes.blob__wrapper}>
           <div className={classes.bl1}>
            <img src={blob1} alt="" />
           </div>
           <div className={classes.bl2}>
            <img src={blob2} alt="" />
           </div>
           <div className={classes.bl3}>
            <img src={blob3} alt="" />
           </div>
           <div className={classes.bl4}>
            <img src={blob4} alt="" />
           </div>
        </div>
        <div className={classes.hero__image_wrapper}>

      <div className={classes.grid}>
       <div className={classes.gr1} style={{backgroundImage:`url(${bgImage})`}}></div>
       <div className={classes.gr2} style={{backgroundImage:`url(${bgImage})`}}></div>
       <div className={classes.gr3} style={{backgroundImage:`url(${bgImage})`}}></div>
       <div className={classes.gr4} style={{backgroundImage:`url(${bgImage})`}}></div>
       <div className={classes.gr5} style={{backgroundImage:`url(${bgImage})`}}></div>
       <div className={classes.gr6} style={{backgroundImage:`url(${bgImage})`}}></div>
       <div className={classes.gr7} style={{backgroundImage:`url(${bgImage})`}}></div>
       <div className={classes.gr8} style={{backgroundImage:`url(${bgImage})`}}></div>
       <div className={classes.gr9} style={{backgroundImage:`url(${bgImage})`}}></div>
       <div className={classes.gr10} style={{backgroundImage:`url(${bgImage})`}}></div>
       <div className={classes.gr11} style={{backgroundImage:`url(${bgImage})`}}></div>
       <div className={classes.gr12} style={{backgroundImage:`url(${bgImage})`}}></div>
       <div className={classes.gr13} style={{backgroundImage:`url(${bgImage})`}}></div>
       <div className={classes.gr14} style={{backgroundImage:`url(${bgImage})`}}></div>
       <div className={classes.gr15} style={{backgroundImage:`url(${bgImage})`}}></div>
       <div className={classes.gr16} style={{backgroundImage:`url(${bgImage})`}}></div>
      
       
    </div>

        </div>
      
    </div>
  )
}

export default Hero
