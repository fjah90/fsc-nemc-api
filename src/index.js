'use strict'
/**
 * Module Dependencies
 */
const express = require('express'),
    path = require('path'),
    cors = require('cors'),
    bodyParser = require('body-parser');

/**
 * Initialize Server
 */

const apiRoute = require('./routes/api.route')
const port = process.env.PORT || 4000 // Create port
const app = express()

/**
 * Middleware
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/json' }))

app.use(cors())
app.use(express.static(path.join(__dirname, 'dist/fsc-nemc-api')))
app.use('/', express.static(path.join(__dirname, 'dist/fsc-nemc-api')))

/**
 * API routes
 */
app.use('/api/v1', apiRoute)

/**
 * Error Handling
 */
app.use((err, req, res, next) => {
    console.error(err.message); // Log error message in our server's console
    if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});

app.listen(port, () => {
    console.log('Connected to port ' + port)
})

module.exports = app; // for testing