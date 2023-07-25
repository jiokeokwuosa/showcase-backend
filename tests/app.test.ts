import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.should();
chai.use(chaiHttp);

describe('No Matching Endpoint', () => {
  describe('* Unknown ', () => {
    it('should throw 404 error when endpoint is not found', (done) => {
      chai
        .request(app)
        .post('/api/auth/none')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
