const cartController = require("../controller/cart.controller")
const router = require("express").Router()
const auth = require("../middleware/auth")
//const authAdmin = require("../middleware/authAdmin")
router.post("/addtoCart",auth, cartController.addtoCart)
router.get("/myCart",auth, cartController.myCart)
router.post("/delfromCart",auth, cartController.delfromCart)
// router.patch("/increaseQ", auth, cartController.increaseQ)
// router.patch("/decreaseQ",auth, cartController.decreaseQ)
//router.get("/updateCart",auth, cartController.totalPrice)

module.exports = router