const { type } = require("express/lib/response")
const mongoose = require("mongoose")
const productscheme = new mongoose.Schema({
    name: {
        type: String,
         required:true
    },
    rate: {
        type:Number
    },
    productimg: {
        type:String
    },
    details: {
        type:String
    },
    price: {
        type: Number,
         required:true
    },
    size: {
          type:String
    },
    description: {
        type:String
    }
    ,
    specification: [{
        model: { type: String},
        color: { type: String},
        material:{ type: String}
        
    }],
    categoryId: {
         type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
       
}, { timestamps: true })

// productscheme.virtual("pDetails", {
//     ref: "Cart.products",
//     localField: "_id",
//     foreignField:"productId"
// })

const product = mongoose.model("product", productscheme)
module.exports=product