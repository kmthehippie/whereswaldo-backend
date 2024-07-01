const app = require("../../app")
const { MongoMemoryServer } = require("mongodb-memory-server")
const request = require("supertest")
const mongoose = require("mongoose")
const { seedDB } = require('../../config/seed.js')
const Game = require("../../models/Game.js")
const ImageToMatch = require("../../models/ImageToMatch.js")


let mongoServer;
//Connect to a TEST db
beforeAll (async()=>{
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await mongoose.connect(uri, {
        dbName: "wheresWaldo"
    })
    await seedDB()
})
//Disconnect from TEST db
afterAll(async()=>{
    await mongoose.connection.dropDatabase()
    await mongoose.disconnect()
    await mongoServer.stop()
})

describe ("Game Routes", ()=>{
    describe("GET: /game", ()=>{
        it("should get a json text", async()=>{
            const res = await request(app).get("/game")
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("message");
        })
    })
    describe("Get: /game/:mapname", ()=>{
        it("should get a mapname, array of imagesToMatch and mapImage", async()=>{
            const res = await request(app).get("/game/universe113")
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty("game")
            expect(res.body).toHaveProperty("imagesToMatch")

        })
    })
    describe("Post: /game/:mapname", ()=>{
        it("should save the player's name", async()=>{
            const res = await request(app).post("/game/gotham").send({ playerName: "KM", timer: 123 })
            expect(res.statusCode).toEqual(201)
            expect(res.body).toHaveProperty("gameId")
        })
    })
    describe("Get: /leaderboard", ()=>{
        it("should retrieve the leader board for a specific map", async()=>{
            await request(app).post("/game/gotham").send({ playerName: "KM", timer: 777 })
            await request(app).post("/game/gotham").send({ playerName: "John", timer: 321 })
            await request(app).post("/game/gotham").send({ playerName: "Dan", timer: 88 })
            await request(app).post("/game/universe113").send({ playerName: "Jack", timer: 543 })
            await request(app).post("/game/universe113").send({ playerName: "Bon", timer: 870 })
            await request(app).post("/game/universe113").send({ playerName: "Joe", timer: 423 })
            await request(app).post("/game/undrcity").send({ playerName: "Jen", timer: 111 })
            await request(app).post("/game/undrcity").send({ playerName: "Bon", timer: 232 })
            await request(app).post("/game/undrcity").send({ playerName: "Jack", timer: 555 })
    
    
            const res = await request(app).get("/game/leaderboard")
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty("savedGames")
        })
    })
})

describe("Game Tests from seeded data in Tests", () => {
    describe("Fetch a Game", ()=>{
        it("Should fetch a game by map name", async()=>{
            const game = await Game.findOne({mapName: "universe113"})
            expect(game).not.toBeNull()
            expect(game.mapName).toBe("universe113")
        })
        describe("Images-to-match ", ()=>{
            it("should contain a gameId that matches the game._id", async()=>{
                const game = await Game.findOne({mapName: "universe113"})
                const image = await ImageToMatch.findOne({
                    imageName: "113-1"
                })
                expect(image.gameId).toEqual(game._id)
            })
        })
    })
    
    
})

