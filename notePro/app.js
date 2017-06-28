const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');

//const index = require('./routes/taskRoutes.js');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/html'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use('/', index);

app.get("/", function(req, res){
    res.sendFile("/html/index.html",  {root: __dirname + '/public/'});
});


app.use("/", require('./routes/taskRoutes.js'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    console.log(err);
    res.end();
});

//module.exports = app;


const hostname = '127.0.0.1';
const port = 3006;
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });