'use strict'
/**
 * Module Services
 */
const tbx = require('../services/tbx-echo-server')

/**
 * @desc Promise to get all files name
 *
 * @returns {Object} Promise wit the Files Name
 *
 */
async function getFiles() {
	return await tbx.getAll();
}

/**
 * @desc Promise to get files by name
 *
 * @param req Requeri String with the file name
 * @param res Response
 *
 * @returns {Object} Promise wit the File data
 *
 */
async function getFileByName(req, res) {
	let file = await tbx.getByName(req, res);
	let sFile = await file !== undefined ? file.split("\n") : "not found";
	return sFile;
}

/**
 * @desc Formatting the File data
 *
 * @param req Requeri is not mandatory, must be with the query string fileName
 *
 * @returns {Object} Promise wit the formatting File or Files data
 *
 */
async function getFormattedFiles(req) {

	const filesName = 'fileName' in req.query ?
		{ files: [(req.query.fileName).trim()] }
		: await this.getFiles();

	const formaterFiles = async () => {
		let i = 0;
		let gulpsCVS = [];
		while (filesName['files'][i]) {
			let newObj = { //Schema
				"file": "",
				"lines": []
			}
			let f = await tbx.getByName(filesName['files'][i]);
			if (f !== undefined) {
				var cf = f.split("\n").filter(t => t !== 'file,text,number,hex'); //remove header cvs

				if (cf.lenght !== 0) {
					Object.entries(cf).forEach(item => {

						var lines = item[1].split(","),
							linesFilter = lines.filter(t => t !== lines[0]),
							newLine = { //Schema
								"text": "",
								"number": 0,
								"hex": "",
							};

						Object.entries(linesFilter).forEach((iteml2, key) => {
							switch (key) {
								case 0:
									newLine["text"] = iteml2[1];
									break;
								case 1:
									newLine["number"] = parseInt(iteml2[1]);
									break;
								case 2:
									newLine["hex"] = iteml2[1];
									break;
							}
						})

						newObj["file"] = lines[0]
						newObj["lines"].push(newLine)
					})
				}

				if (cf != "") //test if empty
					gulpsCVS.push(newObj);
			}
			i++;
		}

		const response = Array.isArray(gulpsCVS) && gulpsCVS.length
			? JSON.parse(JSON.stringify(Object.assign([{}], gulpsCVS)))
			: JSON.parse([{ message: 'not found' }])

		return response;
	}

	return await formaterFiles();
}

module.exports = { getFiles, getFileByName, getFormattedFiles };