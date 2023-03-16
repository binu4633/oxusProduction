import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateTocken.js";
import cloudinary from "../utils/cloudinary.js";

const registerUser = async (req, res) => {
 
  try {
    const { name, email, password } = req.body;

    // throw new Error('the user never existed')
    // console.log(name,email,password);

    const userExist = await User.findOne({ email });
   
    if (userExist) {
      throw new Error("user already exist");
    }

    const user = await User.create({
      name,
      email,
      password,
    });



    if (user) {
      res.send({
        status: "success",
        userInfo: {
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        },
      });
    }
  } catch (e) {
    res.status(500).send({
      status: "failed",
      error: e.message,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // throw new Error('the user never existed')
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.send({
        status: "success",
        userInfo: {
          name: user.name,
          email: user.email,
          image:user.image ? user.image:'',
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(401);
      throw new Error("invalid email or passwrord");
    }
  } catch (e) {
    res.status(500).send({
      status: "failed",
      error: e.message,
    });
  }
};

const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    const newUser = jwt.decode(token);
    const userEmail = newUser.email;
    const user = await User.find({ email: newUser.email });

    if (user.length === 0 || !user) {
      const createdUser = await new User({
        name: newUser.name,
        email: newUser.email,
        image: newUser.picture,
      });
      const newCreatedUser = await createdUser.save();
      res.send({
        status: "success",
        userInfo: {
          name: newCreatedUser.name,
          email: newCreatedUser.email,
          image: newCreatedUser.image,
          // token,
          token: generateToken(newCreatedUser._id),
        },
      });
    } else {
      res.send({
        status: "success",
        userInfo: {
          name: user[0].name,
          email: user[0].email,
          image: user[0].image ? user[0].image : "",
          token: generateToken(user[0]._id),
          // token,
        },
      });
    }
  } catch (e) {
    res.status(500).send({
      status: "failed",
      error: "something wrong please try again",
    });
  }
};

const getUserProfile = async (req, res) => {
  //   const user = await User.findById(req.user._id);

  
  const user = req.user[0];

try {
 
   

  if(!user){
    throw new Error('some went wrong')
  }


      if (user) {
const orders = (a,b)=>{
 const orders = user.orders.slice(a,b);;
//  console.log('orders inside', orders );
 return orders



}



// console.log(orders(0,5));

const newUser = {
  name:user.name,
  email:user.email,
  address:user.adress,
  image:user.image ? user.image :'',
  order:orders(0,5)

}

// console.log( 'new user', user.order);
// console.log( 'new user', user);


    res.status(200).json({
     status:'success',
     profile:newUser
    });
        }
  
} catch (e) {

  res.status(200).json({
    status:'failed',
    error:e
   });
}



  
};


const resetPassword = async(req,res)=>{

  

     const user = req.user[0];
    

  

     try {
      if (user && (await user.matchPassword(req.body.excistingPassword))){
        // console.log('the password matched');
        if(req.body.newPassword === req.body.confirmNewPassword){
         user.password = req.body.newPassword;
         user.save();
  
         res.status(200).send({
           status:'success',
           result:'password update successfully'
         })

        }else{
         throw new Error('cannot update password')
        }

    }else{
      throw new Error('cannot update password')
    }
     } catch (error) {
         res.status(200).send({
          status:'failed',
          error:'cannot update password'
         })
     }

     

}

const profileUpdate = async(req,res)=>{
  
  const user = req.user[0];

    try {
      
    
      const { profileImage } = req.body;
      const userName = req.body.name;
      let profileImageRes;
      if (profileImage) {
        profileImageRes = await cloudinary.uploader.upload(profileImage, {
          upload_preset: "oxus-final",
        });
      }
      let newProfileImage;
      if (profileImageRes) {
        newProfileImage = {
          image: profileImageRes.secure_url,
          // public_id: profileImageRes.public_id,
        };
      }

      if( newProfileImage && newProfileImage.image){

        user.image = newProfileImage.image;
      }

      if(userName){
        user.name = userName
      }

      await user.save();

      res.status(200).send({
        status:'success',
        
      })
    } catch (error) {
    
      res.status(200).send({
        status:'failed',
        
      })
    }

}

const addAddress = async (req, res) => {
 

  // console.log('user from controller', req.user);
  // console.log(req.body);

  try {
    // const user = await User.findById(req.user._id);
    const user = req.user[0];
   
    const reqAddress = req.body;
    // console.log(reqAddress);
    if (reqAddress.pinCode.toString().slice(0, 3) !== "679") {
      throw new Error("we dont have deliver onthis place");
    }
  
    if (user.address.length > 50) {
      throw new Error("cannot save more than 5 address");
    }

    delete reqAddress._id

    user.address.unshift(reqAddress);
    
    await user.save();

 

    res.status(200).send({
      status: "success",
      address: user.address[0],
    });
  } catch (e) {
   
    res.status(500).send({
      status: "failed",
      error: e.message,
    });
  }
};
const editAddress = async (req, res) => {




  try {
    // const user = await User.findById(req.user._id);
    const user = req.user[0];
    const reqAddress = req.body;
    const id = req.body._id;

   
    if (reqAddress.pinCode.toString().slice(0, 3) !== "679") {
      throw new Error("we dont have deliver onthis place");
    }

    const index = user.address.findIndex((ad) => ad._id == id);

  

    const addressId = user.address[index]._id;

    user.address[index] = { ...reqAddress, _id: addressId };

    await user.save();

    //    user.address.unshift(reqAddress);
    //    await user.save();

    //    console.log(user);

    res.status(200).send({
      status: "success",
      address: user.address[index],
    });
  } catch (e) {
 
    res.status(500).send({
      status: "failed",
      error: e.message,
    });
  }
};
const deleteAddress = async (req, res) => {
  

  // console.log('user from controller', req.user);
  // console.log(req.body);

  try {
    // const user = await User.findById(req.user._id);
    const user = req.user[0];
  //  throw new Error('somet thing went wrong')
    const id = req.body._id;

    user.address = user.address.filter(ad=>ad._id != id)
    await user.save();



    res.status(200).send({
      status: "success",
     
    });
  } catch (e) {
   
    res.status(500).send({
      status: "failed",
      error: e.message,
    });
  }
};
const fetchAddressList = async(req,res)=>{

  try {
    const user = req.user[0];
    if(!user) throw new Error('somethig went wrong,try again')
    const addressList = user.address;
    res.status(200).send({
      status: "success",
      addressList,
    });
  } catch (e) {
    res.status(500).send({
      status: "failed",
      error: e.message,
    });
  }

// addressList
}

export {
  loginUser,
  registerUser,
  googleAuth,
  getUserProfile,
  addAddress,
  editAddress,
  deleteAddress,
  fetchAddressList,
  resetPassword,
  profileUpdate
};
