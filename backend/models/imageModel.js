import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
    product:{
        type: mongoose.Schema.ObjectId,
        ref: 'Products'
    },
    color:{
        type:String,
        required:true,
       },
       
    image1:{
        type:Object
    },
    image2:{
        type:Object
    },
    image3:{
        type:Object
    },
    image4:{
        type:Object
    },
    image5:{
        type:Object
    },   
})


const Images = mongoose.model('Images', imageSchema)

export default Images;