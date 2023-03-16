import mongoose from "mongoose";
const productSchema = mongoose.Schema({
    // user:{
    //  type:mongoose.Schema.Types.ObjectId,
    //  required:false,
    //  ref:'User'
    // },
    category:{
        type:String,
        required:true,
       
    },
    name:{
        type:String,
        required:true
    },
    coverImage:{
        type:Object
    },
    colors:[{
        color:String,
        colorImage:{
            type:Object
        },
        coverImage:{
            type:Object,
            required:true
        },
        imageCollection:{
            type: mongoose.Schema.ObjectId,
            ref: 'Images'
        }
    }],
    brand:{
        type:String,
        // required:true
    },
    creator:{
        type:String,
        // required:true
    },
   
    description:{
        type:String,
        // required:true,
       
    },
    price:{
        type:Number,
        // required:true
    },
    discount:{
        type:Number,
        default:0
    },
    sizeType:{
        type: mongoose.Schema.ObjectId,
        ref: 'Size'
    },
    sku:[{
        sku:{
            type:String,
            required:true
        },
        color:{
            type:String,
            required:true
        },
        size:{
            type:String,
            required:true
        },
        sizeIndex:{
            type:Number,
            required:true
        },
        qty:{
            type:Number,
            required:true
        }
    }],
    // sizeOptions:Array,
    // price:{
    //     type:Number,
    //     required:true,
    //     default:0
    //    },
  
productStockCount:{
    type:Number,
    default:0
},
totalSale:{
    type:Number,
    default:0
},

// defaultColor:{
//     color:{
//         type:String
//     },
//     colorId:{
//         type: mongoose.Schema.ObjectId,
//         ref: 'Images'
//     },
// },
productStock:{
    type:Boolean,
    default:true
},

publish:{
    type:Boolean,
    default:false
}
},{
    timestamps:true,
    
})

//the latesst
// productSchema.pre(/^find/, function(next){
//     this.populate({
//         path:'attibutes',
//         // model: 'Product',
//         populate: 
//             {
//               path: 'colorVariations',
//             //   model: 'Color',
//              },
//            })
//     next()
// })
// productSchema.pre(/^find/, function(next){
//     this.populate({
//         path:'productCollection',
//         // model: 'Product',
//         populate: 
//             {
//               path: 'colorVariations',
//             //   model: 'Color',
             
//             },
          
//     // .populate({
//     //     path:'productCollection'.'colorVariations'
//     // })
//         })
//     next()
// })

// productSchema.index({category:'text'},{name:'text'})
// productSchema.index({name:'text'})
const Product = mongoose.model('Product',productSchema);
export default Product;