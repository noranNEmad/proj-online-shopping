
const upload = require("../middleware/fileUpload")
const router = require("express").Router()
router.post("/img", upload.single("myimg"), async (req, res) => { res.send("done") })
module.exports=router