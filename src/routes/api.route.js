'use strict'
/**
 * Module Dependencies
 */
const express = require('express')


const FilesController = require('../controllers/files.js')
const api = express.Router()

/**
 * @desc Check the success callback
 *
 * @param res Response
 *
 * @returns res Data response
 *
 */

const successCallback = (res) => {
	return (result) => {
		res
			.status(200)
			.contentType('application/json')
			.send(result)
	}
};

/**
 * @desc Check the fail callback
 *
 * @param res Response
 *
 * @returns res Data response
 *
 * @throws Console.error
 */

const failCallback = (res) => {
	return (err) => {
		console.error(err);
		res
			.status(500)
			.send({ error: 'Internal server error happened' });
	}
};

/**
 * Middelware, for all /* request
 *
 * @param res Response use to set header
 * @param req Requeri not use
 *
 * @returns Void
 *
 */
api.all('/*', (req, res, next) => {
	// Set respons header (geen idee of dit compleet is)
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-type,Accept,X-Access-Token,X-Key");

	// Set response contenttype
	res.contentType('application/json');

	next();
});

/**
 * Endpoint, root response
 *
 * @param res Response use to set header
 * @param req Requeri not use
 *
 * @returns {Object} wit the Files Name
 *
 */
api.get("/", (req, res) => res.json({ message: "Welcome to API!" }));

/**
 * Endpoint, for get list all file name like External API
 *
 * @param res Response data
 * @param req Requeri data
 *
 * @returns {Object} wit the Files Name
 *
 */
api.get('/files/list', async (req, res, next) => {
	await FilesController.getFiles(req, res)
		.then(successCallback(res), failCallback(res))
	next();
});

/**
 * Endpoint, for get all formated data
 *
 * @param res Response
 * @param req Requeri
 *
 * @returns {Object} wit the Foramtted Files
 *
 */
api.get('/files/data', async (req, res, next) => {
	await FilesController.getFormattedFiles(req, res)
		.then(successCallback(res), failCallback(res))
	next();
});

/**
 * Endpoint, for get file data by file name
 *
 * @param res Response
 * @param req Requeri
 *
 * @returns {Array} wit the Files data
 *
 */
api.get('/file/:name', async (req, res, next) => {
	await FilesController.getFileByName(req.params.name)
		.then(successCallback(res), failCallback(res))
	next();
});

module.exports = api;