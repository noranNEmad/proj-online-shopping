const mongoose = require("mongoose")
const orderscheme = new mongoose.Schema({
    userId: {
        // type: String,
        // required: true
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
        
    },
    products: [{
        productId:{
            // type: String,
            // required: true 
        type: mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true
        }
        ,
        quantites: {
            type: Number,
            default: 1
            //  type: mongoose.Schema.Types.Number,
            // ref:"Cart",
            // required:true
        }
    }],
    statuss: {
        type: String,
        default: "pending" //recived after recieve customer/user
    },
    // amount: {
    //     type: Number, required: true
    //    //  type: mongoose.Schema.Types.Number,
    //     // ref:"Cart",
    //     // required:true
    // },
    adress:{type: Object,require:true}
    
   
       
     
     
}, { timestamps: true })
const order = mongoose.model("Order", orderscheme)
module.exports=order