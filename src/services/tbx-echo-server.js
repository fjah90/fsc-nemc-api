'use strict'
/**
 * Module Dependencies
 */
const fetch = require('node-fetch')

/**
 * Settings
 */

const apiKey = "aSuperSecretKey";
const apiUrl = "https://echo-serv.tbxnet.com/v1";
const headers = {
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + apiKey
}

/**
 * @desc Check status the respondese.
 *
 * @param res Response
 *
 * @returns res Data response
 *
 * @throws HTTP status
 */

const checkResponseStatus = (res) => {
    if (res.ok)
        return res

    throw new Error(`The HTTP status of the reponse: ${res.status}`);
}


const files = {

    /**
     * @desc Get  all name files to the External API
     *
     * @returns {Array} Returns the new array of files name
     *
     * @throws HTTP status err
     */

    getAll: async () => {

        return await fetch(apiUrl + '/secret/files', {
            method: 'GET',
            headers: headers
        }).then(checkResponseStatus)
            .then(res => res.json())
            .catch(err => console.log(err));
    },

    /**
     * @desc Get File by name to the External API
     *
     * @param req String with the File name
     *
     * @returns {Array} Returns the new array of files
     *
     * @throws HTTP status err
     */

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