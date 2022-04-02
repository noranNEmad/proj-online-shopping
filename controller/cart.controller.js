const cartModel = require("../db/models/cart.model")
const proModel = require("../db/models/product.model")
class Cart {
    static addtoCart = async (req, res) => {
        try { 
            let c = await cartModel.findOne({ userId: req.user._id })
            if (!c) {
            c = new cartModel({ products:[req.body], userId: req.user._id })
            await c.save()                 
            }
            else {
                c.products.push(req.body)
                await c.save() 
            }
              res.status(200).send({
                apiStatus: true,
                data: c,
                message: "add cart"
            })
        }
        catch (e) {
            res.send(e.message)
        }
    }
    
    static myCart = async (req, res) => {
        try {
            // let data = []
            const cart = await cartModel.findOne({ userId: req.user._id })
            // cart.products.forEach(async(pro) => {
            //     let pDetail = await proModel.findById(pro.productId)
            //     // console.log(pDetail)
            //    // pDetail.q = pro.quantity
            //     data.push(pDetail)
            //     console.log(data)
            // })
            res.status(200).send({
                apiStatus: true,
                data:cart,
                message: "show cart details"
            
            })

            
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                errors: e.message,
                message: "error in mycart"
            })
        }
    }

    static delfromCart = async (req, res) => {
        const productId = req.params.productId
        try {
            const cart = await cartModel.findOne({ userId: req.user._id })
            console.log(cart.products)
            console.log(cart)
            cart.products = cart.products.filter(pro => {
                return (pro.productId != productId) 
            });
            await cart.save()
            res.status(200).send({
                apiStatus: true,
                message: "product deleted"
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                errors: e.message,
                message: "error in deleting product"
            })
        }
    }

    // static updateCart = async (req, res) => {
    //     try {
    //         const editCart = await cartModel.findByIdAndUpdate(
    //             req.params.id, { $set: req.body }, { runValidators: true }
    //         )
    //         res.status(200).send({
    //             apiStatus: true,
    //             data: editCart,
    //             message: "cart updated"
    //         })
    //     }
    //     catch (e) {
    //         res.status(500).send({
    //             apiStatus: false,
    //             errors: e.message,
    //             message: "error in updating"
    //         })
    //     }
    // }
    // static totalPrice = async(req,res)=>{
    //     try{
    //
    //         res.status(200).send({
    //             apiStatus:true,
    //             data:price,
    //             message:"total price "
    //         })
    //     }
    //     catch(e){
    //         res.status(500).send({
    //             apiStatus:false,
    //             errors:e.message,
    //             message:"error in total price"
    //         })
    //     }

    // }

}

module.exports = Cart