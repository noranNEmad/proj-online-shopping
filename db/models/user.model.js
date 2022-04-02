const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt=require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        minlength:2,
        maxlength:25
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        unique:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error("invalid email format")
        }
    },
    phone:{
        type:String,
        trim:true,
        required:true,
        validate(value){
            if(!validator.isMobilePhone(value, ['ar-EG']))
                throw new Error("invalid phone number")
        }
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minlength:6,
        validate(value){
            if(value.includes(this.name))
                throw new Error('week password')
        }
    },
    age:{
        type:Number,
        min:20,
        max:60
    },
    image:{
        type:String,
        trim:true
    },
    gender:{
        type:String,
        trim:true,
        enum:['male', 'female']
    },
    status:{
        type:Boolean,
        default:false
    },
    type: {
        type: String,
        default: 'user',
        trim: true,
        enum: ['admin', 'user']
    },

    tokens: [{
        token: {
            type:String
        }
    }]
},
    { timestamps: true })

userSchema.methods.toJSON = function () {
    const user = this.toObject()
    delete user.password
    delete user.__v
    return user
}
userSchema.pre("save", async function(){
    const user = this
    if(user.isModified("password"))
        user.password = await bcrypt.hash(user.password, Number(process.env.passwordSalt))
})
userSchema.statics.loginUser = async(email,password,type) => {
    const user = await User.findOne({ email: email })
    if (!user) throw new Error("invalid email")
    const matched = await bcrypt.compare(password, user.password)
    if (!matched) throw new Error("invalid password")
    if (user.type != type) throw new Error("not user")
    return user
    
}
userSchema.statics.loginDashboard = async (email, password, type) => {
    const user = await User.findOne({ email: email })
    if (!user) throw new Error("invalid email")
    const matched = await bcrypt.compare(password, user.password)
    if (!matched) throw new Error("invalid upassword")
    if (user.type != type) throw new Error("not admin")
    return user
}


userSchema.methods.generateToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id }, "autho")
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

const User = mongoose.model('User', userSchema)
module.exports = User