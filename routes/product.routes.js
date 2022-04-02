const productController = require("../controller/product.controller")
const router = require("express").Router()
const upload=require("../middleware/fileUpload")
// const auth = require("../middleware/auth")
const authAdmin=require("../middleware/authAdmin")
router.post("/addproduct",authAdmin,productController.addproduct)
router.delete("/deleteproduct/:id",authAdmin, productController.deleteproduct)
router.patch("/editproduct/:id", authAdmin, productController.editproduct)
// router.get("/showallproduct",authAdmin, productController.showALLproduct)
// router.get("/showsingleproduct/:id", authAdmin, productController.showproduct)
router.get("/showallproduct", productController.showALLproduct)
router.get("/showsingleproduct/:id", productController.showproduct)
router.get("/categoryproducts/:categoryId", productController.showCategoryProdcuts)
router.post("/productImg/:productID", authAdmin, upload.single('product'),productController.productImg)


//token admin
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjNjY2NiMmM0YjZmZWU4ZmE2M2JjZGMiLCJpYXQiOjE2NDgxNTI5NjN9.HC3WtsIvKrUED9MzLoZ5N3tmNysPpK6-uURGp3VaMT0

module.exports = router