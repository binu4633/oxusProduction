import Images from "../models/imageModel.js";
import Product from "../models/productModel.js";
import cloudinary from "../utils/cloudinary.js";

const addProduct = async (req, res) => {
 
  try {
   
    const user = req.user[0];
    

    if(!user.isAdmin){
      return
    }

    // very important 

    // if(req.body.category === '' ||
    //    req.body.name === '' ||
    //    req.body.coverImage === '' ||
    //    req.body. 
    // )

    const isExist = await Product.find({category:req.body.category,name:req.body.name.trim().toLowerCase()});

    // console.log('is exist ', isExist);

    if(isExist.length > 0) throw new Error('this name with same category already exist');

    const { coverImage } = req.body;
    let coverImageRes;
    if (coverImage) {
      coverImageRes = await cloudinary.uploader.upload(coverImage, {
        upload_preset: "oxus-final",
      });
    }
    let newCoverImage;
    if (coverImageRes) {
      newCoverImage = {
        image: coverImageRes.secure_url,
        public_id: coverImageRes.public_id,
      };
    }

    const newProduct = await Product.create({ ...req.body,coverImage:newCoverImage });

    res.send({
      status:'success',
      product:newProduct
    });
  
  } catch (e) {
    res.status(500).send({
      status: "failed",
      error: e.message,
    });
  }
};

const updateProductColor = async (req, res) => {
  try {
    const user = req.user[0];
    

    if(!user.isAdmin){
      return
    }

    const findProduct = await Product.findById(req.params.id);

    const isColorExist = findProduct.colors.filter(
      (pr) => pr.color === req.body.color
    );

    if (isColorExist.length > 0) {
      throw new Error("the color is already existed");
    }

    findProduct.colors.push({ color: req.body.color });

    findProduct.save();

    // console.log();

    res.send(" the product updated");
  } catch (e) {
    res.status(500).send({
      status: "failed",
      error: e.message,
    });
  }
};

const findProductName = async (req, res) => {
  try {
    const user = req.user[0];
    

    if(!user.isAdmin){
      return
    }
    const productNames = await Product.find({ ...req.body }).select("name");
    res.send({
      status: "success",
      productNames,
    });
  } catch (e) {
    res.status(500).send({
      status: "failed",
      error: e.message,
    });
  }
};

const findProductForColors = async (req, res) => {

  try {
    const user = req.user[0];
    

    if(!user.isAdmin){
      return
    }
    const product = await Product.find({ ...req.body }).select(
      "name category colors sku sizeType"
    );
    // console.log("product for colors", product);
    res.send({
      status: "success",
      product,
    });
  } catch (error) {
    res.send(error);
  }
};

const addColors = async (req, res) => {

  try {
    const user = req.user[0];
    

    if(!user.isAdmin){
      return
    }
    if (
      req.body.color === "" ||
      req.body.coverImage ==='' ||
      req.body.image1 === "" ||
      req.body.image2 === "" ||
      req.body.image3 === "" ||
      req.body.image4 === "" ||
      req.body.image5 === ""
    ) {
      return;
    }

    const product = await Product.findById(req.params.id);

    const colorsArray = product.colors;

    const colorExist = colorsArray.find((clr) => clr.color === req.body.color);

    if (colorExist) {
      throw new Error("the color is already existed");
    }

    // console.log(colorsArray);
    // console.log("exist", colorExist);
    const { colorImage } = req.body;
    const { coverImage } = req.body;
    const { image1 } = req.body;
    const { image2 } = req.body;
    const { image3 } = req.body;
    const { image4 } = req.body;
    const { image5 } = req.body;
    let colorImageRes;
    let coverImageRes;
    let image1Res;
    let image2Res;
    let image3Res;
    let image4Res;
    let image5Res;
    if (colorImage) {
      colorImageRes = await cloudinary.uploader.upload(colorImage, {
        upload_preset: "oxus-final",
      });
    }
    if (coverImage) {
      coverImageRes = await cloudinary.uploader.upload(coverImage, {
        upload_preset: "oxus-final",
      });
    }
    if (image1) {
      image1Res = await cloudinary.uploader.upload(image1, {
        upload_preset: "oxus-final",
      });
    }
    if (image2) {
      image2Res = await cloudinary.uploader.upload(image2, {
        upload_preset: "oxus-final",
      });
    }
    if (image3) {
      image3Res = await cloudinary.uploader.upload(image3, {
        upload_preset: "oxus-final",
      });
    }
    if (image4) {
      image4Res = await cloudinary.uploader.upload(image4, {
        upload_preset: "oxus-final",
      });
    }
    if (image5) {
      image5Res = await cloudinary.uploader.upload(image5, {
        upload_preset: "oxus-final",
      });
    }

    let newColorImage;
    let newCoverImage;
    let newImage1;
    let newImage2;
    let newImage3;
    let newImage4;
    let newImage5;

    if (colorImageRes) {
      newColorImage = {
        image: colorImageRes.secure_url,
        public_id: colorImageRes.public_id,
      };
    }
    if (coverImageRes) {
      newCoverImage = {
        image: coverImageRes.secure_url,
        public_id: coverImageRes.public_id,
      };
    }
    if (image1Res) {
      newImage1 = {
        image: image1Res.secure_url,
        public_id: image1Res.public_id,
      };
    }
    if (image2Res) {
      newImage2 = {
        image: image2Res.secure_url,
        public_id: image2Res.public_id,
      };
    }
    if (image3Res) {
      newImage3 = {
        image: image3Res.secure_url,
        public_id: image3Res.public_id,
      };
    }
    if (image4Res) {
      newImage4 = {
        image: image4Res.secure_url,
        public_id: image4Res.public_id,
      };
    }
    if (image5Res) {
      newImage5 = {
        image: image5Res.secure_url,
        public_id: image5Res.public_id,
      };
    }

    const newImageModel = await Images.create({
      product: req.params.id,
      color: req.body.color,
      image1: newImage1,
      image2: newImage2,
      image3: newImage3,
      image4: newImage4,
      image5: newImage5,
    });
    // console.log(newImageModel);

    const newColor = {
      color: req.body.color,
      colorImage:newColorImage ? newColorImage :'',
      coverImage: newCoverImage,
      imageCollection: newImageModel._id,
    };

    product.colors.push(newColor);

    await product.save();

    res.status(200).send({
      status: "success",
      color: "color updated successfully",
    });
  } catch (e) {
   
    res.status(500).send({
      status: "failed",
      error: e.message,
    });
  }
};

const updateColor = async (req, res) => {
  
  try {

    const user = req.user[0];
    

    if(!user.isAdmin){
      return
    }
    const product = await Product.findById(req.params.id);
    const colorsArray = product.colors;

   

    const colorIndex = colorsArray.findIndex(
      (clr) => clr.color === req.body.color
    );

    let colorNameUpdatation;
    let coverImageUpdation;
    if (req.body.updateColor) {
      colorNameUpdatation = req.body.updateColor;
      product.colors[colorIndex].color = colorNameUpdatation;
      await product.save();
    }

    if (req.body.coverImage) {
      const coverImageRes = await cloudinary.uploader.upload(
        req.body.coverImage,
        {
          upload_preset: "oxus-final",
        }
      );

      coverImageUpdation = {
        image: coverImageRes.secure_url,
        public_id: coverImageRes.public_id,
      };

      product.colors[colorIndex].coverImage = coverImageUpdation;
      await product.save();
    }

    if (
      req.body.image1 ||
      req.body.image2 ||
      req.body.image3 ||
      req.body.image4 ||
      req.body.image5
    ) {
      const imageCollectionId = product.colors[colorIndex].imageCollection;
 

      const imageModelCollection = await Images.findById(imageCollectionId);

      

      if (req.body.image1) {
        const image1Res = await cloudinary.uploader.upload(req.body.image1, {
          upload_preset: "oxus-final",
        });

        let image1Updation = {
          image: image1Res.secure_url,
          public_id: image1Res.public_id,
        };

        imageModelCollection.image1 = image1Updation;

        await imageModelCollection.save();
      }
      if (req.body.image2) {
        const image2Res = await cloudinary.uploader.upload(req.body.image2, {
          upload_preset: "oxus-final",
        });

        let image2Updation = {
          image: image2Res.secure_url,
          public_id: image2Res.public_id,
        };

        imageModelCollection.image2 = image2Updation;

        await imageModelCollection.save();
      }
      if (req.body.image3) {
        const image3Res = await cloudinary.uploader.upload(req.body.image3, {
          upload_preset: "oxus-final",
        });

        let image3Updation = {
          image: image3Res.secure_url,
          public_id: image3Res.public_id,
        };

        imageModelCollection.image3 = image3Updation;

        await imageModelCollection.save();
      }
      if (req.body.image4) {
        const image4Res = await cloudinary.uploader.upload(req.body.image4, {
          upload_preset: "oxus-final",
        });

        let image4Updation = {
          image: image4Res.secure_url,
          public_id: image4Res.public_id,
        };

        imageModelCollection.image4 = image4Updation;

        await imageModelCollection.save();
      }
      if (req.body.image5) {
        const image5Res = await cloudinary.uploader.upload(req.body.image5, {
          upload_preset: "oxus-final",
        });

        let image5Updation = {
          image: image5Res.secure_url,
          public_id: image5Res.public_id,
        };

        imageModelCollection.image5 = image5Updation;

        await imageModelCollection.save();
      }
    }

  

    res.send({
      status: "success",
      color: "updation successfull",
    });
  } catch (e) {
    
    res.status(500).send({
        status: "failed",
        error: e.message,
      });
  }
};

const deleteColor = async(req,res)=>{
  
try {

  const user = req.user[0];
    

    if(!user.isAdmin){
      return
    }

    const  product = await Product.findById(req.params.id);

    const colorfind = product.colors.find(clr=>clr.color === req.body.color)

   

    if(colorfind.imageCollection){
        const imagesModel = await Images.findById(colorfind.imageCollection);
      
        const publicArrayId = [];
        if(imagesModel.image1.public_id)  publicArrayId.push(imagesModel.image1.public_id) ;
        if(imagesModel.image2.public_id)  publicArrayId.push(imagesModel.image2.public_id) ;
        if(imagesModel.image3.public_id)  publicArrayId.push(imagesModel.image3.public_id) ;
        if(imagesModel.image4.public_id)  publicArrayId.push(imagesModel.image4.public_id) ;
        if(imagesModel.image5.public_id)  publicArrayId.push(imagesModel.image5.public_id) ;

   

        if(publicArrayId.length >0){
            publicArrayId.forEach(async(pid)=>{
                await cloudinary.uploader.destroy(pid,(result)=>{
                 
                })
            })
        }

    }


    product.colors = product.colors.filter(clr=>clr.color !== req.body.color);

      await product.save()

  
     

    res.send({
        status: "success",
        response: "delete color successfull",
      });
    
} catch (e) {
    res.status(500).send({
        status: "failed",
        error: e.message,
      });
}

}



export {
  addProduct,
  updateProductColor,
  findProductName,
  findProductForColors,
  addColors,
  updateColor,
  deleteColor
};
