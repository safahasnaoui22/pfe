import formidable from "formidable"
import  fs from "fs"
import User from "../models/form.js";
//Create Form


export const createForm = (req, res) => {
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({ error: err })
        }
        if (!fields.name || !fields.email || !file.photo) {
            return res.status(400).json({ error: "Fill all the fields" })
        }

        const user = new User(fields)
        if (file.photo) {
            if (file.photo.size > 1000000000000) {
                return res.status(400).json({ error: "file size is too big" })
            }
            user.photo.data = fs.readFileSync(file.photo.filepath)
            user.photo.contentType = file.photo.mimetype

            user.save((err, result) => {
                if (err) {
                    return res.status(400).json({ error: err })
                }
            })
            res.json({ user })
        }
    })

}

 export const updateForm = (req, res) => {
    let id = req.params.userId;
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({ error: err })
        }
       User.findByIdAndUpdate(
        id,
        {$set:{...fields}},
        {new:true},
        (err,user)=>{
            if (err) {
                return res.status(400).json({ error: "user not found" })
            } 
            if (file.photo) {
                if (file.photo.size > 100000) {
                    return res.status(400).json({ error: "file size is too big" })
                }
                user.photo.data = fs.readFileSync(file.photo.filepath)
                user.photo.contentType = file.photo.mimetype
    
                user.save((err, result) => {
                    if (err) {
                        return res.status(400).json({ error: err })
                    }
                })
                res.json({ user })
            }

        }
       )
    })
}


 export const userPhoto = (req, res) => {
    let id = req.params.userId;
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            res.status(400).json({ error: "user not found" })
        }
        else {
            if (user.photo.data) {
                res.set("Content-Type", user.photo.contentType)
                return res.send(user.photo.data)
            }
        }
    })
}

export const getForm = (req, res) => {
    User.find((err, data) => {
        if (err) {
            return res.json({ error: err })
        }
        res.json(data)
    })
}

export const deleteForm=async(req,res)=>{
    const id = req.params.userId;
    const del = await User.findByIdAndDelete(id)
    res.json(del)
}