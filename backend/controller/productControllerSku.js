import Images from "../models/imageModel.js";
import Product from "../models/productModel.js";
import cloudinary from "../utils/cloudinary.js";

const addSku = async (req, res) => {


  try {
    const user = req.user[0];
    

    if(!user.isAdmin){
      return
    }

    const product = await Product.findById(req.params.id);

    const skuId = String(product._id) + req.body.color + req.body.size;

    const skuArray = product.sku;

    if (skuArray.length > 0) {
      const isExist = skuArray.find((sk) => sk.sku === skuId);

      if (isExist) throw new Error("the sku alredy exist");

      
    }

    const newSku = {
      sku: skuId,
      color: req.body.color,
      size: req.body.size,
      sizeIndex:req.body.sizeIndex,
      qty: req.body.qty,
    };

    product.sku.push(newSku);
    product.productStockCount = product.productStockCount*1 + req.body.qty*1;
    await product.save();

      // console.log(product);
    //   console.log(skuId);

    res.send({
      status: "success",
      result: product.productStockCount
    });
  } catch (e) {
    // console.log(e);
    res.status(500).send({
      status: "failed",
      error: e.message,
    });
  }
};

const updateSku = async (req, res) => {
  try {
    const user = req.user[0];
    

    if(!user.isAdmin){
      return
    }

    const product = await Product.findById(req.params.id);

    const productArrayIndex = product.sku.findIndex(
      (sk) => sk.sku === req.body.sku
    );

    if (productArrayIndex === -1) throw new Error("sku not available");

    product.sku[productArrayIndex].qty =
      product.sku[productArrayIndex].qty*1 + req.body.qty*1;

    product.productStockCount = product.productStockCount*1 + req.body.qty*1;

    await product.save();




    res.send({
      status: "success",
      result: product.sku[productArrayIndex],
    });
  } catch (e) {
    res.status(500).send({
      status: "failed",
      error: e.message,
    });
  }
};


const deleteSku = async(req,res)=>{

 try {

  const user = req.user[0];
    

    if(!user.isAdmin){
      return
    }

 const product = await Product.findById(req.params.id);
 
 if(!product) throw new Error('product not found');

//  console.log();
//  console.log(product.sku.filter(pr=> pr.sku !== req.body.skuid));

 const skuIndex = product.sku.findIndex(pr=>pr.sku === req.body.skuid);

 if(skuIndex === -1) throw new Error('cannot find sku')

 const productQty = product.sku.find(pr=>pr.sku === req.body.skuid).qty;

 product.productStockCount =  product.productStockCount*1 - productQty*1;
 product.sku = product.sku.filter(pr=> pr.sku !== req.body.skuid);

 await product.save();

 res.send({
    status: "success",
    result: 'sku deleted successfuly',
  });
  
 } catch (e) {

  res.status(500).send({
    status: "failed",
    error: e.message,
  });
  
 }

}

export { addSku, updateSku,deleteSku };
