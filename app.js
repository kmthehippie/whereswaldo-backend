const express = require("express");
const createError = require("http-errors")
const RateLimit = require("express-rate-limit")
const helmet = require("helmet")
const compression = require("compression")
const cors = require("cors")
const corsCredentials = require("./config/corsCredentials")
const allowedOrigins = require("./config/allowedOrigins")

//Instantiate routes
const indexRouter = require("./routes/index")
const gameRouter = require("./routes/game")

//**App initializes express**//
const app = express()

//Set Up Limiter
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, //1 min
  max: 20,
})

//Handle options credential check - before CORS 
app.use(corsCredentials)

//CORS setup
const corsOptions = {
  origin: (origin, callback) => {
    if(allowedOrigins.indexOf(origin) !== -1 || !origin){
      callback(null, true)
    }else{
      callback(new Error("Not Allowed By CORS"))
    }
  }, 
  optionsSuccessStatus: 200
}

//App Uses Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(helmet())
app.use(limiter)
app.use(compression())
app.use(cors(corsOptions))

//Disable the X Powered By header
app.disable('x-powered-by');

//App uses Routes
app.use("/", indexRouter)
app.use("/game", gameRouter)

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });

// Other Error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error', {title: "Error"});
  });

module.exports = app