process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');
const should = chai.should();

chai.use(chaiHttp);

/*
* Test the /GET files/list
*/
describe('/GET files/list', () => {
    it('it should GET all the files', (done) => {
        chai.request(server)
            .get('/files/list')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
    });
});

/*
* Test the /GET /file/:name
*/
describe('/GET /file/:name', () => {
    it('it should GET file by name', (done) => {
        chai.request(server)
            .get('/file/' + "test2.csv")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
    });
});

/*
* Test the /GET /files/data
*/
describe('/GET /files/data', () => {
    it('it should GET all the files formatting', (done) => {
        chai.request(server)
            .get('/files/data')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
    });
});

/*
* Test the /GET /files/data?FileName=<FileName>
*/
describe('/GET /files/data?FileName=<FileName>', () => {
    it('it should GET one file formatting', (done) => {
        chai.request(server)
            .get('/files/data?FileName=' + "test2.csv")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
    });
});