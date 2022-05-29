let express = require('express'),
    path = require('path'),
    cors = require('cors'),
    bodyParser = require('body-parser');

// Setting up port with express js
const apiRoute = require('./routes/api.route')
const app = express();

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/fsc-nemc-api')));
app.use('/', express.static(path.join(__dirname, 'dist/fsc-nemc-api')));

//API routes
app.use('/api/v1', apiRoute)

// Create port
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err.message); // Log error message in our server's console
    if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});

module.exports = app; // for testing