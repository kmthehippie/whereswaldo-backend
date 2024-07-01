const request = require("supertest")
const app = require("../../app")

describe ("Game Routes", ()=>{
    describe("GET: /", ()=>{
        it("should get a json text", async()=>{
            const res = await request(app).get("/")

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("message");
        })
    })
})