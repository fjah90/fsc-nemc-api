const fetch = require('node-fetch');

// api key and api url
const apiKey = "aSuperSecretKey";
const apiUrl = "https://echo-serv.tbxnet.com/v1";
const headers = {
    "Accept": "*/*",
    'Content-Type': 'application/json',
    "Authorization": "Bearer " + apiKey
}

function checkResponseStatus(res) {
    if (res.ok) {
        // console.log(res.status)
        return res
    } else {
        // console.log(res.status)
        throw new Error(`The HTTP status of the reponse: ${res.status} (${res.statusText})`);
    }
}

let files = {
    getAll: async () => {

        return await fetch(apiUrl + '/secret/files', {
            method: 'GET',
            headers: headers
        }).then(checkResponseStatus)
            .then(res => res.json())
            .catch(err => console.log(err));
    },
    getByName: async (req) => {

        return await fetch(apiUrl + '/secret/file/' + req, {
            method: 'GET',
            headers: headers
        }).then(checkResponseStatus)
            .then(res => res.text())
            .catch(err => console.log(err));
    }
};

module.exports = files;