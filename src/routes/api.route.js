var express = require('express');
var FilesController = require('../controllers/files.js');
var api = express.Router();

const successCallback = function (res) { return function (result) { res.json(result) } };
const failCallback = function (res) {
	return function (err) {
		console.error(err);
		res.sendStatus(500);
	}
};

//GET
api.get("/", (req, res) => res.json({ message: "Welcome to API!" }));

api.get('/files/list', async (req, res) => {
	await FilesController.getFiles(req, res)
		.then(successCallback(res), failCallback(res))
});

api.get('/files/data', async (req, res) => {
	await FilesController.getFormattedFiles(req, res)
	.then(successCallback(res), failCallback(res))
});

api.get('/file/:name', async (req, res) => {
	await FilesController.getFileByName(req.params.name)
		.then(successCallback(res), failCallback(res))
});
module.exports = api;