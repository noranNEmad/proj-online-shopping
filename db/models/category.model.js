const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:25
    }
},
{ timestamps: true })

categorySchema.pre("save", async function(){
    const category=await Category.findOne({name:this.name})
    if(category) throw new Error("category is already exist")
        
})


const Category = mongoose.model('Category', categorySchema)
module.exports = Category