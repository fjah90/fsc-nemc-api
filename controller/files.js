function getFiles(req, res) {
	//list all file
	return console.log("the file list", res);

}

//Prueba promesas en el servidor
function getFileByName(name) {
	//get file by name
	return console.log("the file is", name);
}

module.exports = { getFiles, getFileByName };