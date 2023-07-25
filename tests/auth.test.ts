import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import { faker } from '@faker-js/faker';

chai.should();
chai.use(chaiHttp);

const email = faker.internet.email();
const password = 'password';
let jwtToken: string;

const user = {
  email,
  password,
  firstName: 'CJ',
  lastName: 'Ok',
};

const incompleteUser = {
  firstName: 'CJ',
  lastName: 'Ok',
};

const invalidUserData = {
  email,
  password,
  firstName: 'C',
  lastName: 'O',
};

const validLoginData = {
  email,
  password,
};

const incompleteLoginData = {
  email,
};

const invalidLoginData = {
  email: 'invalidemail@gmail.com',
  password: '12345567788',
};

// Unit Test for Authentication Route
describe('Auth Route Endpoints', () => {
  // tests for sign up
  describe('POST api/auth/register', () => {
    it('should successfully register a user if all required inputs are provided', (done) => {
      chai
        .request(app)
        .post('/api/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.should.all.keys('token', 'user');
          jwtToken = res.body.data.token;
          done();
        });
    });
    it('should not register a user if any or all of the required fields is/are not provided', (done) => {
      chai
        .request(app)
        .post('/api/auth/register')
        .send(incompleteUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.all.keys('statusCode', 'error');
          done();
        });
    });
    it('should not register a user if any of the input paramters is/are invalid', (done) => {
      chai
        .request(app)
        .post('/api/auth/register')
        .send(invalidUserData)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.all.keys('statusCode', 'error');
          done();
        });
    });
    it('should not register a user if he/she supplies an already existing email address', (done) => {
      chai
        .request(app)
        .post('/api/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.all.keys('statusCode', 'error');
          done();
        });
    });
  });

  // tests for login
  describe('POST api/auth/login', () => {
    it('should successfully login a user if all required inputs are provided', (done) => {
      chai
        .request(app)
        .post('/api/auth/login')
        .send(validLoginData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.all.keys('token', 'user');
          done();
        });
    });
    it('should not login a user if any or all of the required fields is/are not provided', (done) => {
      chai
        .request(app)
        .post('/api/auth/login')
        .send(incompleteLoginData)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.all.keys('statusCode', 'error');
          done();
        });
    });
    it('should not login a user if any of the input paramters is/are invalid', (done) => {
      chai
        .request(app)
        .post('/api/auth/login')
        .send(invalidLoginData)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.all.keys('statusCode', 'error');
          done();
        });
    });
  });

  // tests for profile
  describe('GET api/auth/profile', () => {
    it('should successfully return a users profile if token is supplied', (done) => {
      chai
        .request(app)
        .get('/api/auth/profile')
        .set('token', jwtToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.all.keys('data', 'statusCode');
          done();
        });
    });
    it('should not successfully return a users profile if token is not supplied', (done) => {
      chai
        .request(app)
        .get('/api/auth/profile')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.all.keys('statusCode', 'error');
          done();
        });
    });
  });
});
