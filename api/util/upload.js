
import  multer from "multer" ;
import  path from "path" ;

const storage = multer.diskStorage({
  destination: "public/images/", // wen ch ttsajel pic
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const filter = (file, cb) => {
  const fileType = /jpeg|png|jpg|apng|avif|gif|jfif|pjpeg|pjp|svg/;
  const extname = fileType.test(path.extname(file.originalname));
  if (extname) {
    cb(null, true);
  } else {
    return cb(new Error("accept only jpeg|png|jpg type "));
  }
};
const upload = multer({
  storage: storage,
limits: {
    fileSize: 1000000000
},


  fileFilter: function (req, file, cd) {
    filter(file, cd);
  },
});
export default upload;
