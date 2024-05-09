import jwt from "jsonwebtoken";

export const authToken=async(req, res, next)=>{
     
let token;
try {

  if(req.headers.authorization){
    token = req.headers.authorization.split(" ")[1];
  }

    if (!token) {
      return res.status(401).json({ message: "Authentication is failed" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("Error occurred when verifying token:", err.message);
        return res.status(401).json({ msg: "please token not valid" });
      }
      console.log("Successfully verified token");
      req.user=decoded;
      next();
    });
console.log("")
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Authentication is failed", err });
  }
}