const path=require("path")
require('dotenv').config()
require("../db/connection")
const cors=require("cors")
const express = require("express")
const app = express()
app.use(cors())

app.use(express.json())
const userRoutes = require("../routes/user.routes")
const productRoutes = require("../routes/product.routes")
const orderRoutes = require("../routes/order.routes")
const categoryRoutes = require("../routes/category.routes")
const cartRoutes = require("../routes/cart.routes")

const staticfiles = path.join("../uploads")

app.use(express.static(staticfiles))
app.use("/user", userRoutes)
app.use("/product", productRoutes)
app.use("/cart",cartRoutes)
app.use("/order", orderRoutes)
app.use("/category", categoryRoutes)


app.get('*', (req,res)=> res.status(404).send({ 
    apiStatus: false, 
    message: "incorrect route" 
}))
module.exports = app