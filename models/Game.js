const mongoose = require("mongoose")

const GameSchema = new mongoose.Schema({
    imagesToMatch: [{ type: mongoose.Schema.Types.ObjectId, ref: "ImageToMatch" }],
    mapImage: {type: [String], required: true},
    mapName: {type: String, required: true}
})

const Game = mongoose.model("Game", GameSchema)

module.exports = Game