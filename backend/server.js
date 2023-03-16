import path from 'path';
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
// import cloudinary from "./utils/cloudinary.js";
import categoryAndSizeRoutes from './routes/categoryAndSizeRoutes.js'
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from './routes/orderRoutes.js';
import orderAdminRoutes from './routes/orderAdminRoutes.js';
import userAdminRoutes from './routes/userAdminRoutes.js'
// import testRoutes from './routes/testRoutes.js';
// import AppError from './utils/appError.js';
dotenv.config();

const app = express();
app.use((req, res, next) => {
  console.log(req.originalUrl);
  if (req.originalUrl === '/api/order/webhook') {
    next(); // Do nothing with the body because I need it in a raw state.
  } else {
    app.use(express.json({ limit: "150mb" }));
    app.use(express.urlencoded({ limit: "150mb", extended: true }));
    // next()
    express.json({ limit: "150mb" })(req, res, next);  // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
    // express.json()(req, res, next);  // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
  }
});

// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));




connectDB();

// app.get("/", (req, res) => {
//   res.send("the api is running");
// });
app.use("/api/products", productRoutes);
app.use("/api/category", categoryAndSizeRoutes);
app.use("/api/user", userRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/orderAdmin',orderAdminRoutes);
app.use('/api/userAdmin',userAdminRoutes);

// app.use('/api/test', testRoutes );


// app.get("/api/images", async (req, res) => {
//   const { resources } = await cloudinary.search
//     .expression("folder:oxus")
//     .sort_by("public_id", "desc")
//     .max_results(30)
//     .execute();

//     const publicIds = resources.map(file=>file.public_id);

//     res.send(publicIds)
// });


// console.log('path', path.resolve());

const __dirname = path.resolve()

if(process.env.NODE_ENV ==='production'){
  app.use(express.static(path.join(__dirname,'frontend/build')));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
  })
}

app.all('*', (req,res,next)=>{
  res.status(404).json({
    status:'fail',
    message:`can't find ${req.originalUrl} in this server`
  })

  // const err = new Error(`can't find ${req.originalUrl} in this server`);
  // err.status= 'fail'; 
  // err.statusCode=404;

  // next(err)
//   next(new AppError(`can't find ${req.originalUrl} in this server`,404))

});

// app.use((err,req,res,next)=>{

//   console.log(err.stack);
//   err.statusCode = err.statusCode ||500;
//   err.status = err.status || 'error';

//   res.status(err.statusCode).json({
//     status:err.status,
//     message:err.message
//   })
// })

//binu4633
//j7cf3ibeI8I2BZYA

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `app listeing port ${PORT} and running in${process.env.NODE_ENV}`
  );
});
