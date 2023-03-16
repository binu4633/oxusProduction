import Category from "../models/categoryModel.js";
import Size from "../models/sizeModel.js";


const showCategory = async (req, res) => {
    try {
//   throw new Error('this a huge error')
      const categories = await Category.find();
      res.status(200).send({
        status:'success',
        categories
      });
    } catch (e) {
      res.status(500).send({
        status:'failed',
        error:e.message
      });
    }
  };
  
  const addCategory = async (req, res) => {
    try {
      const user = req.user[0];
      // console.log('user', user);

      if(!user.isAdmin){
        return
      }

      if (req.body.category) {
        const createCategory = await Category.create({
          ...req.body,
        });
  
        res.status(200).send({
            status:'success',
            category:createCategory
        });
      }
    } catch (error) {
      res.send({
        status:'failed',
        error:error.message
      });
    }
  };
  const deleteCategory = async(req,res)=>{
    //   console.log('delete cat id', req.params.id);
      try {
        const user = req.user[0];
        // console.log('user', user);
  
        if(!user.isAdmin){
          return
        }
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).send({
          status:'success',

        })
      } catch (error) {
        // console.log(error);
        res.send({
          status:'failed'
        })
      }
  }

  const addSizes = async (req, res) => {
    // console.log(req.body);
    try {
       
      const user = req.user[0];
      // console.log('user', user);

      if(!user.isAdmin){
        return
      }

        const sizeName = req.body.sizeName; 
        const sizes = req.body.sizes;
        const sizeArray = sizes.split(',').map((sz,i)=>{
            return(
              {
                size:sz,
                sizeIndex:i
              }
            )
         
        })

        const sizeChart = {
          size:['chest','front length','shoulder'],
          S:[23,35,56],
          M:[45,36,52],
          L:[23,35,56],
          XL:[23,35,56],
        }

        // console.log();
  
      const newSize = await Size.create({
        sizeName,
        sizes:sizeArray,
        sizeChart
      });
  
      res.status(200).send({
        status:'success',
        size:newSize
      });
    } catch (error) {
      res.send({
        status:'failed',
        error:error.message
      });
    }
  };
  const showSizes = async (req, res) => {
    try {
     
      const sizes = await Size.find();
      res.send({
        status:'success',
        sizes
      });
    } catch (error) {
      res.send({
        status:'failed',
        error:error.message
      });
    }
  };

  const updateSizes = async(req,res)=>{
    // console.log('req body',req.body);
    // console.log('req params',req.params);

    try {
      // console.log(req.body);
      const user = req.user[0];
      // console.log('user', user);

      if(!user.isAdmin){
        return
      }
      const sizeName = req.body.sizeName; 
      const sizes = req.body.sizes;
      const sizeArray = sizes.split(',').map((sz,i)=>{
        return(
          {
            size:sz,
            sizeIndex:i
          }
        )
     
    })

    const newSize = {
        sizeName,
        sizes:sizeArray
      };

    // console.log(sizeArray);

        const updateSize = await Size.findOneAndUpdate({_id:req.params.id},{...newSize});
        // console.log(updateSize);
        res.status(200).send({
            status:'success',
            result:'the size update succesfully'
        })
    } catch (error) {
        // console.log(error);
        res.send({
            status:'failed',
            error:error.message
          });
    }
  };

  const deleteSize = async(req,res)=>{
    // console.log('req params delete', req.params);
    try {
      const user = req.user[0];
      // console.log('user', user);

      if(!user.isAdmin){
        return
      }
        await Size.findByIdAndDelete(req.params.id);
        res.status(200).send({
            status:'success',
            result:'the size delete succesfully'
        })
    } catch (e) {
        res.send({
            status:'failed',
            error:e.message
          });
    }
  }

const findSize = async(req,res)=>{
      // console.log(req.params.id);

    try {

        const size = await Size.findById(req.params.id);

        res.send({
           status:'success',
           size
        })
        
    } catch (e) {
        res.send({
            status:'failed',
            error:e.message
          });
    }

}

export {showCategory,addCategory,addSizes,showSizes,deleteCategory,updateSizes,deleteSize,findSize}