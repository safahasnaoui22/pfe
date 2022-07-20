import express from 'express'
import { Add, FindAll , Delete} from '../controllers/images.controllers.js';
const router = express.Router()

router.post('/upload',Add)
router.get('/upload',FindAll)
router.delete('/upload/:id',Delete)


export default router
