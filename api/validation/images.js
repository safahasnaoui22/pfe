import  validator from "validator";
import  isEmpty from "./isEmpty.js";

 function ValidateImage(req) {
  let errors = {};
  req.body.title = !isEmpty(req.body.title) ? req.body.title : "";
  req.file = !isEmpty(req.file) ? req.file : "";

  if (validator.isEmpty(req.body.title)) {
    errors.title = "Required title";
  }
  if (!req.file.filename) {
    errors.image = "Required image";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
export default ValidateImage;