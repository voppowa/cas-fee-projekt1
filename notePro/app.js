const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/html'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res){
    res.sendFile("/html/index.",  {root: __dirname + '/public/'});
});


app.use("/", require('./routes/indexRoutes.js'));
app.use("/tasks", require('./routes/taskRoutes.js'));


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    console.log(err);
    res.end();
});

const hostname = '127.0.0.1';
const port = 3006;
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });