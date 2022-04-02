const categorymodel = require("../db/models/category.model")

class category{
    static create = async (req, res) => { 
        try {
        const category = new categorymodel(req.body)
            await category.save()
            res.status(200).send(
                {
                    apistatus: true,
                    message: "category added",
                    data: category
                })
        }
        catch (e) {
              res.status(500).send(
                {
                    apistatus: false,
                    message: " error in add category ",
                    errors:e.message  
                })  
        }
    }
    static edit = async (req, res) => { 
        try {
            
            let category = await categorymodel.findByIdAndUpdate(req.params.id, req.body)
             category = await categorymodel.findById(req.params.id)
            res.status(200).send(
                {
                    apistatus: true,
                    message: "category edited",
                    data:category
                })
        }
        catch (e) {
              res.status(500).send(
                {
                    apistatus: false,
                    message: " error in edit category ",
                    errors:e.message  
                })  
        }
    }
    static delete = async (req, res) => {
        try {
            const category = await categorymodel.findByIdAndDelete(req.params.id)
            res.status(200).send(
                {
                    apistatus: true,
                    message: "category deleted",
                    data: category
                })
        }
        catch (e) {
              res.status(500).send(
                {
                    apistatus: false,
                    message: " error in delete category ",
                    errors:e.message  
                })  
        } }
    //get all orders for all users
    static showAllcategories = async (req, res) => {
         try {
            const categories = await categorymodel.find()
            res.status(200).send(
                {
                    apistatus: true,
                    message: "all  categories show",
                    data: categories
                })
        }
        catch (e) {
              res.status(500).send(
                {
                    apistatus: false,
                    message: " error in show  categories ",
                    errors:e.message  
                })  
        }
        
     }
}

module.exports=category