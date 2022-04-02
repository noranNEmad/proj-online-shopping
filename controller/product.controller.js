const productmodel = require("../db/models/product.model")
class product{
    static addproduct = async (req,res) => {
        
        try {
        const product = new productmodel(req.body)
            await product.save()
            res.status(200).send(
                {
                    apistatus: true,
                    message: "product added",
                    data:product
                    
                }
            )
            
        }
        catch (e) {
              res.status(500).send(
                {
                    apistatus: false,
                    message: " error in add product ",
                    errors:e.message
                  
                    
                }
            )
            
        }
    }
    static showALLproduct = async (req, res) => {
        
          try {
           const products = await productmodel.find().sort()
            res.status(200).send(
                {
                    apistatus: true,
                    message: "products fetched",
                    data:products
                    
                }
            )
            
        }
        catch (e) {
              res.status(500).send(
                {
                    apistatus: false,
                    message: " error in show all products ",
                    errors:e.message
                  
                    
                }
            )
            
        }
        
          
    }
    static showproduct = async (req, res) => {
          
          try {
           const product = await productmodel.findById(req.params.id)
            res.status(200).send(
                {
                    apistatus: true,
                    message: "product showed",
                    data:product
                    
                }
            )
            
        }
        catch (e) {
              res.status(500).send(
                {
                    apistatus: false,
                    message: " error in show product ",
                    errors:e.message       
                }
            )   
        }   
    }
    static showCategoryProdcuts = async (req, res) => {      
          try {
              const products = await productmodel.find({categoryId:req.params.categoryId})
            res.status(200).send(
                {
                    apistatus: true,
                    message: "products showed",
                    data:products
       
                }
            ) 
        }
        catch (e) {
              res.status(500).send(
                {
                    apistatus: false,
                    message: " error in show product ",
                    errors:e.message       
                }
            )   
        }   
    }
    static deleteproduct = async (req, res) => {
        try{
            const product = await productmodel.findByIdAndDelete(req.params.id)
            res.status(200).send({
                    apistatus: true,
                    message: "  product  deleted",
                    data:product
                  
            })
        }
        catch (e) {
            res.status(500).send({
                    apistatus: false,
                    message: " error in delete product ",
                    errors:e.message
                  
            })
            
         } 
    }
     static editproduct = async (req, res) => {
        try{
            let product = await productmodel.findByIdAndUpdate(req.params.id, req.body)
          
            console.log(product)
               product = await productmodel.findById(req.params.id)
            console.log(product)
            
            res.status(200).send({
                    apistatus: true,
                    message: "  product  edited",
                    data:product
                  
            })
        }
        catch (e) {
            res.status(500).send({
                    apistatus: false,
                    message: " error in edit product ",
                    errors:e.message
                  
            })
            
         } 
    }
    static productImg = async (req, res) => {
        const productID=req.params.productID
         const product = await productmodel.findByIdAndUpdate(productID,{productimg:req.file.path})
        // req.user.image = req.file.path
        await product.save()
        res.status(200).send({
            apiStatus:true,
            data: req.file,
            message:"uploaded"
        })
    }
    
}
module.exports=product