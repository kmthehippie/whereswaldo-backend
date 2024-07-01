const Game = require("../models/Game");
const ImageToMatch = require("../models/ImageToMatch");
const SavedGame = require("../models/SavedGame")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator")

exports.game_detail = asyncHandler(async(req,res,next)=>{
    try {
        if (!req?.params?.mapName) {
            return res.status(400).json({ "message": "Map name Required In Params" });
        }
        const paramsMapName = req.params.mapName;
        const game = await Game.findOne({ mapName: paramsMapName }).exec();
        if (!game) {
            return res.status(404).json({ "message": "Game not found" });
        }

        const imagesToMatch = await ImageToMatch.find({ gameId: game._id }).exec();

        res.status(200).json({
            game: game,
            imagesToMatch: imagesToMatch
        });
    } catch (error) {
        next(error);
    }
})

exports.save_game = [
    body("playerName")
        .trim()
        .notEmpty().withMessage("Player Name required")
        .isString()
        .escape(),
    asyncHandler(async(req,res,next)=>{
  
    const errors = validationResult(req)
    const {playerName, timer} = req.body
    const mapName = req.params.mapName
    const gameId = await Game.findOne({ mapName: mapName }).exec()

    if(!errors.isEmpty()){ 
        return res.status(400).json({errors: errors.array()})} 
    else {
        const savedGame = new SavedGame({
            gameId: gameId,
            playerName: playerName,
            mapName: mapName,
            timer: timer
        })
        try{
            const newSavedGame = await savedGame.save()
            res.status(201).json(newSavedGame)
        }catch(error){
            next(error)
        }
    }
})]

exports.leaderboard = asyncHandler(async(req,res,next)=>{
    try{
        const savedGames = await SavedGame.find().sort({mapName: 1, timer: 1}).exec()
        res.status(200).json({savedGames: savedGames})
    }catch(err){
        next(err)
    }
})