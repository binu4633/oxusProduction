import nodeMailer from 'nodemailer';
import orderEmail from './orderEmail.js';
import resetEmail from './resetPasswordEmail.js';
import dotenv from 'dotenv';

dotenv.config();

const sendOrderEmail = async(options)=>{
    // crate transporter
   const transporter = nodeMailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT,
    auth:{
        user:process.env.EMAIL_USERNAME,
        pass:process.env.EMAIL_PASSWORD
    }
 })
    //define email options
 const mailOptions = {
    from:'oxus collections<oxus.io>',
    to:options.email,
    subject:options.subject,
   //  text:options.message,
    html:orderEmail(options.order),
 }   

    // actually send emails

 await transporter.sendMail(mailOptions)
//  await transporter.sendMail()
}

const sendResetEmail = async(options)=>{
   // crate transporter
  const transporter = nodeMailer.createTransport({
   host:process.env.EMAIL_HOST,
   port:process.env.EMAIL_PORT,
   auth:{
       user:process.env.EMAIL_USERNAME,
       pass:process.env.EMAIL_PASSWORD
   }
})
   //define email options
const mailOptions = {
   from:'oxus collections<oxus.io>',
   to:options.email,
   subject:options.subject,
  //  text:options.message,
   html:resetEmail(options.resetUrl),
}   

   // actually send emails

await transporter.sendMail(mailOptions)
//  await transporter.sendMail()
}

export {sendOrderEmail,sendResetEmail};
