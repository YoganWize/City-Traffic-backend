import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from './../App.class';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/data', () => {

    it('responds with JSON array', () => {
        return chai.request(app).get('/api/v1/test-data')
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.length(3);
            });
    });

    it('should include "b" key and value', () => {
        return chai.request(app).get('/api/v1/test-data')
            .then(res => {
                let item = res.body.find(d => d.a === 3);
                expect(item).to.exist;
                expect(item.b).to.exist;
                expect(item.b).to.equal(4);
            });
    });

});