import Order from "../models/orderModel.js";

const findOrders = async(req,res)=>{
  try {
    const user = req.user[0];
    // console.log('user', user);

    if(!user.isAdmin){
      return
    }

    const queryObj = {...req.query}
    const excludedFields = ['page','sort', 'limit','fields'];
    excludedFields.forEach(el=>delete queryObj[el]) ;
   //  console.log(req.query,queryObj);
 
   let queryStr = JSON.stringify(queryObj);
   queryStr=  queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match=> `$${match}`) ;
 
    //  console.log('query str', queryStr);
    //  console.log('query str', JSON.parse(queryStr));
    //  console.log('req query', req.query);
     let query =  Order.find(JSON.parse(queryStr))
   
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
//  console.log(query);
// console.log('document count', await Order.countDocuments(query));
 const totalNum = await Order.countDocuments(query)
 const page = req.query.page*1 || 1
 const limit = req.query.limit*1 || 1
 const skip = (page-1)*limit
 query = query.skip(skip).limit(limit)
 
 const pageCount = Math.ceil( totalNum/limit);
// console.log('page count', pageCount);
 if(req.query.page){
   const numProduct = await Order.countDocuments();
   if(skip > numProduct) throw new Error('the document does not excist');
 }
 
 //127.0.0.1:5000/api/products/all?fields=category,name,MRP&page=2&limit=3
 
    //  const product = await query.select('category name price discount coverImage');
     
    // res.send({
    //     status: "success",
    //     result: product,
    //     pageCount:pageCount
    //   });
    const orders = await query.select('total delivery_status payment_status createdAt')

    res.send({
        status:'success',
        orders,
        pages:pageCount
    })
  } catch (error) {
    res.send({
        status:'failed',
        error,
    })
  }
}

const getOrderDetail = async(req,res)=>{
    // res.send(req.params.id)

    try {
      const user = req.user[0];
      // console.log('user', user);

      if(!user.isAdmin){
        return
      }

        if(!req.params.id) throw new Error('eroor please try later');

        const order = await Order.findById(req.params.id);
        

        res.send({
            status:'success',
            order
        })
    } catch (error) {
        res.send({
            status:'failed',
            error
        })
    }

}


export {findOrders,getOrderDetail}