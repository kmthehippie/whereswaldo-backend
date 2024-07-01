const mongoose = require("mongoose")

const SavedGameSchema = new mongoose.Schema({
    gameId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
    playerName: {type: String, required: true},
    mapName: {type: String, required: true},
    timer: {type: Number, required: true}
})

const SavedGame = mongoose.model("SavedGame", SavedGameSchema)

module.exports = SavedGame