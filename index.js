require("dotenv").config()
const mongoose = require("mongoose")

//Set Up Mongoose
mongoose.set("strictQuery", false)
async function main(){
    await mongoose.connect(process.env.MONGODB_URI)
}
main().catch((err)=> console.log(err))


const port = process.env.PORT
const app = require("./app")

//Listen to PORT
app.listen(port , "0.0.0.0", () => {
    console.log("Running on Port " + port)
})