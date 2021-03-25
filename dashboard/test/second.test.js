var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

describe("Testing RestApi",() => {
    it('Should return status 200',(done) => {
        chai.request(`http://localhost:9080`)
        .get('/users')
        .then((res) => {
            expect(res).to.have.status(200);
            done();
        })
        .catch((err) => {
            throw err
        })
    })

    it('Should return status 404',(done) => {
        chai.request(`http://localhost:9080`)
        .get('/user')
        .then((res) => {
            expect(res).to.have.status(404);
            done();
        })
        .catch((err) => {
            throw err
        })
    })

    it('Should return status 200',(done) => {
        chai.request(`http://localhost:9080`)
        .post('/addUser')
        .send({"name":'TestUser',"City":"Test","phone":"test"})
        .then((res) => {
            expect(res).to.have.status(200);
            done();
        })
        .catch((err) => {
            throw err
        })
    })

})