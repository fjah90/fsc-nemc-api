const tbx = require('../services/tbx-echo-server')

async function getFiles() {
	//list all file
	return tbx.getAll();
}

async function getFileByName(req, res) {
	//get file by name
	let file = await tbx.getByName(req, res);
	let sFile = await file !== undefined ? file.split("\n") : "not found";
	return sFile;
}

async function getFormattedFiles() {

	let filesName = await this.getFiles();

	const formaterFiles = async () => {
		let i = 0;
		let gulpsCVS = [];
		while (filesName['files'][i]) {
			// if (i >= 2) { break; }
			//Schema
			let newObject = {
				"file": "",
				"lines": []
			}
			let f = await tbx.getByName(filesName['files'][i]);
			if (f !== undefined) {
				//remove header
				var cf = f.split("\n").filter(function (e) { return e !== 'file,text,number,hex' });

				if (cf.lenght !== 0) {
					Object.entries(cf).forEach(item => {

						var lines = item[1].split(",");
						newObject["file"] = lines[0];
						var linesFilter = lines.filter(function (e) { return e !== lines[0] });
						//Schema

						var newObjectLine = {
							"text": "",
							"number": null,
							"hex": "",
						}
						Object.entries(linesFilter).forEach((iteml2, key) => {
							switch (key) {
								case 0:
									newObjectLine["text"] = iteml2[1];
									break;
								case 1:
									newObjectLine["number"] = parseInt(iteml2[1]);
									break;
								case 2:
									newObjectLine["hex"] = iteml2[1];
									break;
							}
						})
						newObject["lines"].push(newObjectLine)
					})
				}

				if (cf.lenght > 0)
					console.log(cf[i].split(","))
				//test if empty
				if (cf != "")
					gulpsCVS.push(newObject);
			}
			i++;
		}

		return gulpsCVS;
	}

	return formaterFiles();

}

module.exports = { getFiles, getFileByName, getFormattedFiles };