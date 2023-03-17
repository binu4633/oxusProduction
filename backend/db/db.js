import mongoose from'mongoose';
// const validator = require('validator');


let connetUrl = process.env.MONGO_URI2
// if(process.env.NODE_ENV ==='production'){
//   connetUrl = process.env.MONGO_URI2;
 
// }else{
//   connetUrl = process.env.MONGO_URI;
 
// }
const connectDB = async()=>{
    try {
    //   const conn = await mongoose.connect(process.env.MONGO_URI,{
    //     // useUnifiedTopology:true,
    //     // useNewUrlParser:true,
    //     useCreateIndex:true
    //   }) 





       console.log('conn',connetUrl);
      const conn = await mongoose.connect(connetUrl) 

      // console.log(`Mongodb connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`mongoose Error ${error.message}`);
        process.exit(1)
    }
}

export default connectDB;