let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

let server = require('../index.js');

chai.use(chaiHttp);

const url = 'http://localhost:4000';

/*
* Test the /GET files
*/
describe('/GET files', () => {
    it('it should GET all the files', (done) => {
        chai.request(server)
            .get('/files')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
    });
});