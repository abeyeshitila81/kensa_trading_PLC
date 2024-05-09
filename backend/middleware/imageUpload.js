import multer from "multer";

const MIME_TYPE_MAP={
    "image/png":"png",
    "image/jpg":"jpg",
    "image/jpeg":"jpeg"
}
 export const fileUpload=multer({
    limits:50000, //5kb
   storage: multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "upload")
    },
    filename:(req, file, cb)=>{
    //  const ext=MIME_TYPE_MAP[file.mimetype]
     cb(null, file.originalname);
    //  cb(null, file.filename + "."+ ext )
    }
   }),
   fileFilter:(req, file, cb)=>{
    const isValid=!!MIME_TYPE_MAP[file.mimetype]
    const error=isValid? null :new Error("invalid mime type!")
    cb(error, isValid)
   }
})