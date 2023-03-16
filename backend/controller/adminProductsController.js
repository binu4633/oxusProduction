import Product from "../models/productModel.js";
import Images from "../models/imageModel.js";
import cloudinary from "../utils/cloudinary.js";

const adminCollection = async(req,res)=>{

 

    
    
    try {
      const user = req.user[0];
    

    if(!user.isAdmin){
      return
    }
        const queryObj = {...req.query}

        const excludedFields = ['page','sort', 'limit','fields'];
        excludedFields.forEach(el=>delete queryObj[el]) ;
       //  console.log(req.query,queryObj);
     
       let queryStr = JSON.stringify(queryObj);
       queryStr=  queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match=> `$${match}`) ;
     
     
         let query =  Product.find(JSON.parse(queryStr))
       
      // console.log('qury str',JSON.parse(queryStr) );
       // sorting
         if(req.query.sort){

           const sortBy =  req.query.sort.split(',').join(' ');
         query = query.sort(sortBy)
         }else{
           query = query.sort("createdAt")
         }
       //127.0.0.1:5000/api/products/all?sort=-MRP
       //limiting
       if(req.query.fields){
         const fields = req.query.fields.split(',').join(' ');
         query = query.select(fields)
       }
       // else{
       //   query = query.select(-__v)
       // }
     //127.0.0.1:5000/api/products/all?fields=category,name,MRP
     // paginatins
     //page=3limit=10
    //  console.log(query);
    // console.log('document count', await Product.countDocuments(query));
     const totalNum = await Product.countDocuments(query)
     const page = req.query.page*1 || 1
     const limit = req.query.limit*1 || 1
     const skip = (page-1)*limit
     query = query.skip(skip).limit(limit)
     
     const pageCount = Math.ceil( totalNum/limit);
    // console.log('page count', pageCount);
     if(req.query.page){
       const numProduct = await Product.countDocuments();
       if(skip > numProduct) throw new Error('the document does not excist');
     }
     
     //127.0.0.1:5000/api/products/all?fields=category,name,MRP&page=2&limit=3
     
       
         
       
     
         const products = await query.find().select('category name price productStockCount coverImage publish discount')
        //  const products = await query.find().select('category name price  discount')
    
         res.send({
            status: "success",
            products,
            pageCount:pageCount
          });
        
    } catch (error) {
        res.send({
            status:'failed',
            error,
        })
    }
}


const updateProduct = async(req,res)=>{
 

   try {
    const user = req.user[0];
    

    if(!user.isAdmin){
      return
    }

    if(!req.body.coverImage){

      const newProduct = await Product.findOneAndUpdate({_id:req.params.id},{...req.body})
    }else{
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
  
      const newProduct = await Product.findOneAndUpdate({_id:req.params.id},{coverImage:newCoverImage });
    }
    // console.log(newProduct);
    res.send({
      status:'success'
    })
   } catch (e) {
    // console.log(e);
    res.status(500).send({
      status: "failed",
      error: e.message,
    });
   }
}







export {adminCollection,updateProduct}