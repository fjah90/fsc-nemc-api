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
			//Schema
			let newObject = {
				"file": "",
				"lines": []
			}
			let f = await tbx.getByName(filesName['files'][i]);
			if (f !== undefined) {
				//remove header
				var cf = f.split("\n").filter(function (e) { return e !== 'file,text,number,hex' });
				Object.entries(cf).forEach(item => {
					console.log(cf[i])
					var lines = item[1].split(",");
					newObject["file"] = lines[0];
					var linesFilter = lines.filter(function (e) { return e !== lines[0] });

					// console.log(linesFilter)
					var newObjectLine = { }
					Object.entries(linesFilter).map(iteml2 => {
						console.log('map--------------')
						console.log(iteml2)
						newObjectLine["text"].push(item[0])
						newObjectLine["number"].push(item[1])
						newObjectLine["hex"].push(item[2][0])
					})

					newObject["lines"].push(newObjectLine)
				})
				console.log(newObject)

				if (cf.lenght > 0)
					console.log(cf[i].split(","))
				//test if empty
				if (cf != "")
					gulpsCVS.push(cf);
			}
			i++;
		}

		return gulpsCVS;
	}

	return formaterFiles();

}

module.exports = { getFiles, getFileByName, getFormattedFiles };