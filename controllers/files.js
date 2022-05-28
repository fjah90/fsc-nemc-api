const tbx = require('../services/tbx-echo-server')


async function getFiles(req, res) {
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
				console.log('---in if !undefined--------------')
				console.info(cf)
				if (cf.lenght !== 0) {
					console.log('---in if !null--------------')

					Object.entries(cf).forEach(item => {
						console.log('---1sf forEach--------------')
						// console.log(item)

						var lines = item[1].split(",");
						newObject["file"] = lines[0];
						var linesFilter = lines.filter(function (e) { return e !== lines[0] });

						var newObjectLine = {
							"text": "",
							"number": null,
							"hex": "",
						}
						console.log(linesFilter)
						Object.entries(linesFilter).forEach((iteml2, key) => {
							console.log('---2sf forEach--------------')
							// console.info(iteml2[1])
							switch (key) {
								case 0:
									console.info('c1 ', iteml2[1])
									newObjectLine["text"]= iteml2[1];

									break;
								case 1:
									console.info('c2 ', iteml2[1])
									newObjectLine["number"] = parseInt(iteml2[1]);

									break;
								case 2:
									console.info('c3 ', iteml2[1])
									newObjectLine["hex"] = iteml2[1];
									break;

							}
						})
						newObject["lines"].push(newObjectLine)
					})
				}
				console.log(newObject)

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