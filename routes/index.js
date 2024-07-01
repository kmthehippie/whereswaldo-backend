const express = require("express")
const router = express.Router()

//Require Controllers here


//Routes

router.get("/", (req,res,next) => {
    res.status(200)
    res.json({ message: "This is the INDEX route"})
})

module.exports = router