const orderController = require("../controller/order.controller")
const router = require("express").Router()
const auth=require("../middleware/auth")
router.post("/create",auth,orderController.create)
router.delete("/delete/:id",auth,orderController.delete)
router.patch("/edit/:id", auth,orderController.edit)
router.get("/showall",auth,orderController.showAllOrders)
router.get("/showuserorder/:userId",auth ,orderController.showUserOrder)
















//add verifyToken
// edit*********verifyTokenAndAdmin
//delete******verifyTokenAndAdmin 
// user ****verifyTokenAndAuthorization
//all **** verifyTokenAndAdmin

module.exports = router