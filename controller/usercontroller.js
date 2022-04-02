const { findOneAndDelete } = require("../db/models/user.model")
const userModel = require("../db/models/user.model")
class User{
    static add = async(req, res)=>{
        try{
            const user = new userModel(req.body)
            await user.save()
             const token =await user.generateToken()
            res.status(200).send({
                apiStatus:true,
                data:user,
                message:"user added"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in register"
            })
        }
    }
    static show = async(req, res)=>{
        try{
            const users = await userModel.find().sort({email:1})
            res.status(200).send({
                apiStatus:true,
                data:users,
                message:"user fetched"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in fetched"
            })
        }
    }
    static showsingle = async (req, res) => {
        const id=req.params.id
        try{
            const user = await userModel.findById( id )
            res.status(200).send({
                apiStatus:true,
                data:user,
                message:"user found"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in showsingle"
            })
        }
    }
    static login = async (req, res) => {
        const id=req.params.id
        try{
            const user = await userModel.loginUser(req.body.email, req.body.password,"user")
            const token =await user.generateToken()
            res.status(200).send({
                apiStatus:true,
                data: { user, token },
                message:"user found"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in showsingle"
            })
        }
    }
    static loginAdmin = async (req, res) => {
        try {
            const user = await userModel.loginDashboard(req.body.email, req.body.password, "admin")
            const token = await user.generateToken()
            res.status(200).send({
                apiStatus: true,
                data: { user, token },
                message: "logged in"
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                errors: e.message,
                message: "error in admin"
            })
        }

    }
    static del = async(req,res)=>{
        try {
            const user = await userModel.findByIdAndDelete(req.params.id)
            res.status(200).send({
                apiStatus: true,
                data: user,
                message: "user deleted"
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                errors: e.message,
                message: "error in deleting"
            })
        }
    }
    static editWithToken = async(req,res)=>{
        try{
            const user = await userModel.findByIdAndUpdate(
                req.user._id, req.body, {runValidators:true}
            )
            res.status(200).send({
                apiStatus:true,
                data:user,
                message:"user deleted"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in deleting"
            })
        }
    }
    static logout = async (req, res) => {
        
        try{
            req.user.tokens = req.user.tokens.filter(t => {
              return t.token!=req.token
            })
                 await req.user.save()
            res.status(200).send({
                apiStatus:true,
                data: "",
                message:"loged out"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in logout"
            })
        }
    }
    static logoutAll = async (req, res) => {
        
        try{
            req.user.tokens = []
            await req.user.save()
            res.status(200).send({
                apiStatus:true,
                data: { user, token },
                message:"loged out"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in logout"
            })
        }
    }
     static changePass = async(req, res)=>{
        try{
            req.user.password = req.body.password
            await req.user.save()
            res.status(200).send({
                apiStatus:true,
                data:"",
                message:"changed"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:"",
                message:"cannot change"
            })
        }
    }
    static profile = async(req, res)=>{
        res.status(200).send({data:req.user, apiStatus:true, message:"profile fetched"})
    } 
    static profileImg = async(req,res)=>{
        req.user.image = req.file.path
        await req.user.save()
        res.status(200).send({
            apiStatus:true,
            data: req.file,
            message:"uploaded"
        })
    }
    static addnewaAdmin = async (req, res) => {
        try {
            const newaAdmin = new userModel({ ...req.body, type: "admin" })
            await newaAdmin.save()
            res.status(200).send({
                apiStatus: true,
                data: newaAdmin,
                message: "newaAdmin added"
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                errors: e.message,
                message: "error in register"
            })
        }
    }
    static deleteAdmin = async (req, res) => {
        try {
            const Admin = await userModel.findByIdAndDelete({_id:req.params.id, type: "admin" })
            res.status(200).send({
                apistatus: true,
                message: "  Admin  deleted",
                data: Admin

            })
        }
        catch (e) {
            res.status(500).send({
                apistatus: false,
                message: " error in delete Admin ",
                errors: e.message

            })

        }
    }
    static showallAdmin = async (req, res) => {
        try {
            const Admins = await userModel.find({type: "admin"})
            res.status(200).send({
                apistatus: true,
                message: "  Admin fetv",
                data: Admins

            })
        }
        catch (e) {
            res.status(500).send({
                apistatus: false,
                message: " error in delete Admin ",
                errors: e.message

            })

        }
    }
    
}

module.exports = User