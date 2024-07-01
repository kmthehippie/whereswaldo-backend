const mongoose = require('mongoose');
const Game = require('../models/Game');
const ImageToMatch = require('../models/ImageToMatch');
const gamesData = require('./seeds/games.json');
const universe113Data = require('./seeds/imagesToMatch/universe113.json');
const gothamData = require('./seeds/imagesToMatch/gotham.json');
const undrcityData = require('./seeds/imagesToMatch/undrcity.json');
require("dotenv").config()

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await Game.deleteMany({});
        await ImageToMatch.deleteMany({});

        const games = await Game.insertMany(gamesData);
        const gameMap = games.reduce((map, game) => {
            map[game.mapName] = game._id;
            return map;
        }, {});

        const seedImagesForMap = async (mapName, imageData) => {
            const gameId = gameMap[mapName];
            const imagesToMatchWithGameId = imageData.map(image => {
                image.gameId = gameId;
                return image;
            });
            const imagesToMatch = await ImageToMatch.insertMany(imagesToMatchWithGameId);
            await Game.findByIdAndUpdate(gameId, { imagesToMatch: imagesToMatch.map(image => image._id) });
        };

        await seedImagesForMap('universe113', universe113Data);
        await seedImagesForMap('gotham', gothamData);
        await seedImagesForMap('undrcity', undrcityData);

        console.log('Database seeded successfully!');
    } catch (err) {
        console.error("Seeding error: " + err);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
