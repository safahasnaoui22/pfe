
import express from 'express'
import { createForm, getForm, userPhoto ,updateForm , deleteForm  } from '../controllers/FormControllers.js';
const router = express.Router()
router.post("/create", createForm)
router.get("/get", getForm)
//for photo
router.get("/photo/:userId", userPhoto)
router.put("/edit/:userId", updateForm)
router.delete("/delete/:userId",deleteForm)

export default router








