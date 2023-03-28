import mongoose from "mongoose";

const returnOrderSchema = mongoose.Schema({
    order:{
        type: mongoose.Schema.ObjectId,
        ref: 'Order'
    },
    paymentIntentId:{
        type:String
    },
    phone:{
        type:Number,
        required:true
    },
   product:{
    sku:{
        type:String
    },
    category:{
        type:String
    },
    name:{
        type:String
    },
    brand:{
        type:String
    },
    color:{
        type:String
    },
    size:{
        type:String
    },
    quantity:{
        type:Number
    },
    price:{
        type:Number
    },
    totalPrice:{
        type:Number
       }
   },
   shippingAddress:{
    name:{
        type:String
    },
    email:{
      type:String
    },
    phoneNumber:{
      type:String
    },
    country:{
      type:String
    },
    address:{
      type:String
    },
    place:{
      type:String
    },
    city:{
      type:String
    },
    state:{
      type:String
    },
    pinCode:{
      type:String
    },
   },

    status:{
        type:String,
        default:'pending',
        enum:['pending','progress','completed']
    },

},{
    timestamps:true,
    
});

const ReturnOrder = mongoose.model('ReturnOrder',returnOrderSchema);

export default ReturnOrder;