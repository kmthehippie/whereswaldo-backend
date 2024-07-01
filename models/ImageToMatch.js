const mongoose = require("mongoose")

const ImageToMatchSchema = new mongoose.Schema({
    topleft : {
        type: [Number],
        default: [0,0]
    },
    btmright : {
        type: [Number],
        default: [0,0]
    },
    imageName: {type: String, required: true},
    image: {type: String, required: true},
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game"}
})

const ImageToMatch = mongoose.model("ImageToMatch", ImageToMatchSchema)
module.exports = ImageToMatch