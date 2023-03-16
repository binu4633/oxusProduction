import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    category:String,
   
})

const Category = mongoose.model('Category',categorySchema);
export default Category;