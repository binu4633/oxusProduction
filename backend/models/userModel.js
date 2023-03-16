const { randomBytes,createHash } = await import('node:crypto');
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
     
    
    },
    email: {
      type: String,
      required: true,
      unique: true,
     
     
    },
    password: {
      type: String,
     
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    image:String,
    address:[
        {
            name: {
                type: String,
                required: true,
              },
              email: {
                type: String,
                required: true,
               
              },
              phoneNumber:{
                type:Number,
                required:true
              },
              country:{
                type:String,
                default:'India'
              },
              address:{
                type:String,
                required:true

              },
              place:{
                type:String,
                required:true
              },
              city:{
                type:String,
                required:true
              },
              state:{
                type:String,
            
              },
              pinCode:{
                type:Number,
                required:true
              }
        }
    ],
    orders:[
      {
        order:{
          type: mongoose.Schema.ObjectId,
          ref: 'Orders'
        },
        date:{
          type:Date
        }
      }
    ],

    passwordResetToken:String,
    passwordResetExpires: Date,

  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}


userSchema.pre('save', async function(next){
    const user = this;
  
  
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
  
    // console.log('just before saving ');
  
    next()
  })

userSchema.methods.createPasswordResetToken =  function(){
  const resetToken = randomBytes(32).toString('hex');
  this.passwordResetToken =  createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10*60*1000;



  return resetToken;
}


const User = mongoose.model("User", userSchema);
export default User;
