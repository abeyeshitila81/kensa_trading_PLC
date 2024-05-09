import userModels from "../Models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const userSignUp = async (req, res) => {
  let existUser, newUser;
  try {
    console.log(req.body)
    const { name, email, password , image} = req.body;
    const isFirstUser=await userModels.countDocuments()===0
    // const image = req?.file?.path || "";
    const role=isFirstUser ? "ADMIN" :"GENERAL"
    const hashPassword = await bcrypt.hash(password, 10);
    if (!hashPassword) {
      return res.status(403).json({ msg: "please your password is not exist" });
    }
    existUser = await userModels.findOne({ email }).select("-password");

    if (existUser) {
      return res 
        .status(400)
        .json({ msg: "Your email already exist please sign in" });
    }

    newUser = await userModels.create({
      name,
      email,
      password: hashPassword,
      image,
      role
    });
    if (newUser) {
      const token = jwt.sign(
        { email: newUser.email, id: newUser._id, role:newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      newUser.password = undefined;
      res.status(200).json({ msg: "successfully sign up", newUser, token });
    }
  } catch (error) {
    console.log("error is ", error.message);
    res.status(404).json({ msg: error.message });
  }
};


export const userLogin=async(req,res)=>{
  let existUser
  try {
    const {email, password}=req.body
    console.log(req.body)
     existUser=await userModels.findOne({email})
     console.log(existUser)
     if(existUser){
      const token = jwt.sign(
        { email: existUser.email, id: existUser._id, role:existUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      const mathPassword=await bcrypt.compare(password, existUser.password)
        if (mathPassword){
          existUser.password=undefined
          return res.status(200).json({msg:"successfully login", existUser, token})
        }else{
          return res.status(400).json({msg:"incorrect password"})
        }
     }else{
      return res.status(404).json({msg:"please sign up your credential is not found"})
     }
  } catch (error) {
    console.error("The error is ", error.message)
    res.status(404).json({ msg:error.message });
  }
}

export const getUser = async (req, res) => {
  try {
    const {role}=req.user;
    if(role==="ADMIN"){
      const result = await userModels.find({});
      if (result.length > 0) {
        res.status(200).json({ message: "Users retrieved successfully", users: result });
      } else {
        res.status(404).json({ message: "No users found" });
      }
    }else{
      res.status(401).json({msg:"This User is deny to access all user  "})
    }
  
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateRole=async(req, res)=>{

   try {
    const {userID:_id, name, email, role}=req.body

    const payload={
      email:email,
      name:name,
      role :role
    }

    let updateUser=await userModels.findByIdAndUpdate(_id, payload)
    
    if(updateUser){
      res.status(200).json({
        msg:"role is updated",
        error:false,
        success:true,
        data:updateUser
      })
    }
   } catch (error) {
     console.log("Error is occur :", error.message)
    res.status(400).json({
      msg:error.message,
      error:true,
      success:false,
    })
    
   }
}