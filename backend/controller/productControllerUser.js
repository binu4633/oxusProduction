import Product from "../models/productModel.js";
import Images from "../models/imageModel.js";


const  fetchProductUser = async(req,res)=>{

     try {
        // console.log('req query', req.query);
        // const product = await Product.find(req.query).select('category name price discount coverImage')
        //  console.log(product);
        const queryObj = {...req.query}
        const excludedFields = ['page','sort', 'limit','fields','keyword'];
        excludedFields.forEach(el=>delete queryObj[el]) ;
       //  console.log(req.query,queryObj);

     
       let queryStr = JSON.stringify(queryObj);
       queryStr=  queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match=> `$${match}`) ;

       
       const keyword =req.query.keyword?{
        category:{
         $regex:req.query.keyword,
         $options:'i'
        },productStockCount:{$gt :0},publish:true
     }:{productStockCount:{$gt :0},publish:true}

     const parsedStr = JSON.parse(queryStr);
     
       
        //  let query =  Product.find(JSON.parse(queryStr))
        const prStockgt = {productCount:{$gt:0}}
      let query =  Product.find({...JSON.parse(queryStr),...keyword,...prStockgt},)
        // query.find({productCount:{$gt:0}})
       //127.0.0.1:5000/api/products/all?discount[gte]=10
       
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
  
  
     const totalNum = await Product.countDocuments(query)
     const page = req.query.page*1 || 1
     const limit = req.query.limit*1 || 10
     const skip = (page-1)*limit
     query = query.skip(skip).limit(limit)
     
     const pageCount = Math.ceil( totalNum/limit);
   
     if(req.query.page){
       const numProduct = await Product.countDocuments();
       if(skip > numProduct) throw new Error('the document does not excist');
     }
     
     //127.0.0.1:5000/api/products/all?fields=category,name,MRP&page=2&limit=3
     
         const product = await query.select('category name price discount coverImage');
         
        res.send({
            status: "success",
            result: product,
            pageCount:pageCount
          });
     } catch (e) {
        
        res.status(500).send({
            status: "failed",
            error: e.message,
          });
     }

}

const fetchProductDetail = async(req,res)=>{
    try {

     

       const product = await Product.findById(req.params.id)
                      .populate({
                        path:'sizeType',
                        model:'Size'
                      })

        res.send({
            status: "success",
            result: product
          });  
    } catch (e) {
    
        res.status(500).send({
            status: "failed",
            error: e.message,
          });
    }
}


const fetchSliderImages = async(req,res)=>{

   
    try {
         
         

        const images = await Images.findById(req.params.id).select('-color -product');

        if(!images)  throw new Error('images cannot be found');
      
         const imagesArray = [];

         if(images){
            imagesArray.push(images.image1.image)
            imagesArray.push(images.image2.image)
            imagesArray.push(images.image3.image)
            imagesArray.push(images.image4.image)
            imagesArray.push(images.image5.image)
          }

        //   console.log(imagesArray);

        res.send({
            status: "success",
            result: imagesArray
          });   
    } catch (e) {
        res.status(500).send({
            status: "failed",
            error: e.message,
          });
    }
}


const testProducts = async(req,res)=>{
  try {
    const keyword ={
      category:{
       $regex:'t sh',
       $options:'i'
      }
   }
    
// const product = await Product.find({productStockCount:{$gt :0}})
const product = await Product.find({category:{
  $regex:'t sh',
  $options:'i'
 },productStockCount:{$gt :0},publish:false})

    res.send({
      num:product.length,
     product
    })
  } catch (error) {
    res.send({
      error
    })
  }
}

export {fetchProductUser,fetchProductDetail,fetchSliderImages,testProducts}