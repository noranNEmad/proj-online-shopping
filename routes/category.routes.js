const categoryController = require("../controller/category.controller")
const router = require("express").Router()
const authAdmin=require("../middleware/authAdmin")
router.post("/add",authAdmin, categoryController.create)
router.delete("/delete/:id",authAdmin, categoryController.delete)
router.patch("/edit/:id", authAdmin,categoryController.edit)
router.get("/showall",categoryController.showAllcategories)

module.exports = router