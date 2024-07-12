const express = require("express")
const router = express.Router()
const game_controller = require("../controller/gameController");


//Require Controllers here


//Routes

router.get("/", (req,res,next) => {
    res.status(200)
    res.json({ message: "This is the INDEX route"})
})

router.get("/leaderboard", game_controller.leaderboard)

module.exports = router