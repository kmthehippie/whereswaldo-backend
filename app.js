const express = require("express");
const createError = require("http-errors")

//Instantiate routes
const indexRouter = require("./routes/index")
const gameRouter = require("./routes/game")

//**App initializes express**//
const app = express()

//App Uses Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

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