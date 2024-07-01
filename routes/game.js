const express = require("express");
const router = express.Router();
// Require Controllers here
const game_controller = require("../controller/gameController");

// Routes
router.get("/", (req, res, next) => {
    res.status(200).json({ message: "This is the GAME route" });
});

router.get("/leaderboard", game_controller.leaderboard)

router.get("/:mapName", game_controller.game_detail)

router.post("/:mapName", game_controller.save_game)



module.exports = router;
