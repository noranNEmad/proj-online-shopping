const ordermodel = require("../db/models/order.model")
class order{
    static create = async (req, res) => { 
        try {
        const order = new ordermodel(req.body)
            await order.save()
            res.status(200).send(
                {
                    apistatus: true,
                    message: "order added",
                    data: order
                })
        }
        catch (e) {
              res.status(500).send(
                {
                    apistatus: false,
                    message: " error in add order ",
                    errors:e.message  
                })  
        }
    }
    static edit = async (req, res) => { 
        try {
           const order = await ordermodel.findByIdAndUpdate(req.params.id,req.body)
            res.status(200).send(
                {
                    apistatus: true,
                    message: "order edited",
                    data: order
                })
        }
        catch (e) {
              res.status(500).send(
                {
                    apistatus: false,
                    message: " error in edit order ",
                    errors:e.message  
                })  
        }
    }
    static delete = async (req, res) => {
        try {
            const order = await ordermodel.findByIdAndDelete(req.params.id)
            res.status(200).send(
                {
                    apistatus: true,
                    message: "order deleted",
                    data: order
                })
        }
        catch (e) {
              res.status(500).send(
                {
                    apistatus: false,
                    message: " error in delete order ",
                    errors:e.message  
                })  
        } }
    //get user orders
    static showUserOrder = async (req, res) => {
        try {
            const orders = await ordermodel.find({ userId: req.params.userId })
            res.status(200).send(
                {
                    apistatus: true,
                    message: " user's orders show",
                    data: orders
                })
        }
        catch (e) {
              res.status(500).send(
                {
                    apistatus: false,
                    message: " error in show user's orders ",
                    errors:e.message  
                })  
        }

     }
    //get all orders for all users
    static showAllOrders = async (req, res) => {
         try {
            const orders = await ordermodel.find()
            res.status(200).send(
                {
                    apistatus: true,
                    message: "all orders show",
                    data: orders
                })
        }
        catch (e) {
              res.status(500).send(
                {
                    apistatus: false,
                    message: " error in show orders ",
                    errors:e.message  
                })  
        }
        
     }
}

module.exports=order