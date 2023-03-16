import User from "../models/userModel.js"

const getUsers = async(req,res)=>{

    try {
      const user = req.user[0];
    

      if(!user.isAdmin){
        return
      }
        const queryObj = {...req.query}
        const excludedFields = ['page','sort', 'limit','fields','keyword'];
        excludedFields.forEach(el=>delete queryObj[el]) ;
       //  console.log(req.query,queryObj);
     
       let queryStr = JSON.stringify(queryObj);
       
       queryStr=  queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match=> `$${match}`) ;
     
  
     
      const keyword =req.query.keyword?{
        email:{
         $regex:req.query.keyword,
         $options:'i'
        }
     }:{}
     const parsedStr = JSON.parse(queryStr);
     
     
         let query =  User.find({...JSON.parse(queryStr),...keyword} )
        

      
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
     
    
     const totalNum = await User.countDocuments(query)
     const page = req.query.page*1 || 1
     const limit = req.query.limit*1 || 1
     const skip = (page-1)*limit
     query = query.skip(skip).limit(limit)
     
     const pageCount = Math.ceil( totalNum/limit);
  
     if(req.query.page){
       const numProduct = await User.countDocuments();
       if(skip > numProduct) throw new Error('the document does not excist');
     }
  
    
      const users = await query.find().select('name email');
       

   
  
       res.send({
        status:'success',
        users,
        pages:pageCount
       })

    } catch (e) {
        res.send({
            status:"failed",
            error:e
        })
    }
  
}

const getUserDetail = async(req,res)=>{
    try {
      const puser = req.user[0];
    

      if(!puser.isAdmin){
        return
      }
       if(!req.params.id) throw new Error('something went wrong');
       
       const user = await User.findById(req.params.id);
       
       if(!user) throw new Error('cannot find user');



       res.send({
         status:"success",
         user
       })
       
    } catch (error) {
       res.send({
        status:'failed',
        error
       }) 
    }
}


const testUser = async(req,res)=>{
    try {
        
        const keyword = req.query.keyword ? {
           name:{
            $regex:req.query.keyword,
            $options:'i'
           }
        }:{}
      
        const users = await User.find({...keyword})

        res.send({
            status:'success',
            users
        })

    } catch (error) {
        res.send({
            status:'failed',
            error
        })
    }
}


export {getUsers,getUserDetail,testUser}