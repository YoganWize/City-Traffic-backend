import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../App3.class';

chai.use(chaiHttp);
const expect = chai.expect;


describe('GET api/v1/users/:id', () => {

    it('responds with single JSON object', () => {
        return chai.request(app).get('/api/v1/users/1')
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
            });
    });

    it('should return Admin', () => {
        return chai.request(app).get('/api/v1/users/1')
            .then(res => {
                expect(res.body.user.name).to.equal('Admin');
            });
    });

});