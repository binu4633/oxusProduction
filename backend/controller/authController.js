const {createHash } = await import('node:crypto');
import path from 'path';
import User from "../models/userModel.js";
import {sendResetEmail} from "../utils/email.js";
import generateToken from "../utils/generateTocken.js";

// const domain = 'http://localhost:3000';

// console.log('domain', process.env.DOMAIN);

const domain = path.resolve();

// if(process.env.NODE_ENV == 'development'){
//   domain = process.env.DOMAIN
// }else{
//   domain = process.env.DOMAINPRO
// }

console.log('domain', domain);



const forgotPassword = async(req,res)=>{
// get user on posted email

const user = await User.findOne({email:req.body.email});

if(!user){
   throw new Error('there is no user in this email address')
   
}

//generate random reset token

const resetToken = user.createPasswordResetToken();

await user.save({validateBeforeSave:false})

// send it to users email

// const resetUrl = `${req.protocol}://${req.get('host')}/api/user/resetPassword/${resetToken}`;
// const resetUrl = `${req.socket.remoteAddress}://${req.get('host')}/api/user/resetPassword/${resetToken}`;
const resetUrl = `${domain}/resetPassword/${resetToken}`;


const message = `forget your password? submit a PATCH request with your new password and password confirm to
       ${resetUrl}. \n if you didn't forget your password, please ignore this email`;

    //  console.log('req soket', req.socket.remoteAddress);
    //  console.log('req get hot', req.get('client'));

    try {

        await sendResetEmail({
            email:user.email,
            subject:'Your password reset email',
            resetUrl,
    
         })  
    
         res.status(200).json({
            status:'success',
            message:'link send to your email,link will expire in 10 minuts'
         }) 
    
        
    } catch (error) {
        // console.log(error);
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({validateBeforeSave:false})
        res.status(200).json({
            status:'failed',
            message:'message sending failed please try again'
         }) 
    }   
  
}
const resetForgetPassword = async(req,res)=>{


    try {
      // get user based on token

const hashedToken = createHash('sha256').update(req.params.token).digest('hex');

const user = await User.findOne({passwordResetToken:hashedToken,passwordResetExpires:{$gt:Date.now()}});

if(!user){
    throw new Error('Token is invalid or expired')
}

//if token has no expired, and there is user, set new password

user.password = req.body.password;
// user.passwordConfirm = req.body.passwordConfirm;
user.passwordResetToken = undefined;
user.passwordResetExpires = undefined;

await user.save();


//update changedPasswordAt property for  the user 

//log the user in and send jwt

const token = generateToken(user._id);

res.send({
    status: "success",
    userInfo: {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    },
  });  
    } catch (e) {
        res.send({
            status: "failed",
            error:'something went wrong please try again'
          });  
    }


}

export {forgotPassword,resetForgetPassword}