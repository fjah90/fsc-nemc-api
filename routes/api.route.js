var express = require('express');
var FilesController = require('../controller/files.js');
var api = express.Router();

const successCallback = function(res) { return function(result) { res.json(result) }};
const failCallback = function(res){ return function(err) {
	console.error(err);
	res.sendStatus(500);
}};

//GET
api.get('/files', FilesController.getFiles);
api.get('/file/:name', function (req, res) {
	CustomerController.getCustomerById(req.params.id)
		.then(successCallback(res), failCallback(res));
});

module.exports = api;