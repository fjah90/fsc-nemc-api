const tbx = require('../services/tbx-echo-server')

async function getFiles() {
	//list all file
	return await tbx.getAll();
}

async function getFileByName(req, res) {
	//get file by name
	let file = await tbx.getByName(req, res);
	let sFile = await file !== undefined ? file.split("\n") : "not found";
	return sFile;
}

async function getFormattedFiles(req) {

	const filesName = 'fileName' in req.query ?
		{ files: [req.query.fileName] }
		: await this.getFiles();

	const formaterFiles = async () => {
		let i = 0;
		let gulpsCVS = [];
		while (filesName['files'][i]) {
			//Schema
			let newObj = {
				"file": "",
				"lines": []
			}
			let f = await tbx.getByName(filesName['files'][i]);
			if (f !== undefined) {
				//remove header
				var cf = f.split("\n").filter(t => t !== 'file,text,number,hex');

				if (cf.lenght !== 0) {
					Object.entries(cf).forEach(item => {

						var lines = item[1].split(",");
						newObj["file"] = lines[0];
						var linesFilter = lines.filter(t => t !== lines[0]);
						//Schema
						var newLine = {
							"text": "",
							"number": 0,
							"hex": "",
						}
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
						newObj["lines"].push(newLine)
					})
				}
				//test if empty
				if (cf != "")
					gulpsCVS.push(newObj);
			}
			i++;
		}

		const response = Array.isArray(gulpsCVS) && gulpsCVS.length
			? JSON.parse(JSON.stringify(Object.assign({}, gulpsCVS)))
			: JSON.parse([{ message: 'not found' }])

		return response;
	}

	return await formaterFiles();
}

module.exports = { getFiles, getFileByName, getFormattedFiles };