import request from 'supertest';
import { expect } from 'chai';
import { faker } from '@faker-js/faker';

import app from '../app';
import { NewUser } from '../types/NewUser';

describe('HOA Webservice', () => {
  //let accessToken:string = '';  
  let newUser:NewUser;

  before(() => {
    newUser = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
    }
  });

  it('Healthcheck', async () => {
    const response = await request(app)
      .get('/api/v1/ping');
    expect(response.status, 'Status code is wrong!').to.equal(200);
    expect(response.body.status).to.equal('Service is up and running. DB connected succesfully.');
  });

  it('Register new user', async () => {
    const response = await request(app)
        .post('/api/v1/register')
        .send(newUser);
      expect(response.headers["content-type"]).to.include('application/json');
      expect(response.status, 'Status code is wrong!').to.equal(201);
      expect(response.body.message).to.equal('Thanks for registering');
  });

  it('Invalid login in', async () => {
    const response = await request(app)
      .post('/api/v1/login')
      .send({ "username": faker.internet.userName(), "password": faker.internet.password()});
    expect(response.status).to.equal(401);
    expect(response.text).to.equal('Unauthorized');
  });

  it('Valid login in', async () => {
    const response = await request(app)
      .post('/api/v1/login')
      .send({ "username": newUser.username, "password": newUser.password});
    expect(response.status).to.equal(200);
    expect(response.headers["content-type"]).to.includes('application/json');
    expect(response.body.message).to.equal(`Welcome ${newUser.username}!`);
    expect(response.body.accessToken).to.not.be.null;
    //accessToken = response.body.accessToken;
  });

});
