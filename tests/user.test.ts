import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.should();
chai.use(chaiHttp);

// Unit Test for Authentication Route
describe('User Route Endpoints', () => {
  // tests for random user endpoint
  describe('GET api/users/random', () => {
    it('should successfully return a random user', (done) => {
      chai
        .request(app)
        .get('/api/users/random')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.keys('data', 'statusCode');
          done();
        });
    });
  });
});
