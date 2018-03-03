import { expect } from 'chai';
import request from 'supertest';

import '../../spec-helper';
import app from '../../../src/app';

let db;
describe('create a user', () => {
  beforeEach(async function () {
    db = this.connection;
  });

  it('creates', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Peter Gibbons',
        username: 'peter.gibbons',
      })
      .expect(201);

    const user = await db('users').first();

    expect(user).to.have.property('id');
    expect(user).to.have.property('budget', 10);
    expect(user).to.have.property('name', 'Peter Gibbons');
    expect(user).to.have.property('username', 'peter.gibbons');
    expect(user).to.have.property('createdAt');
    expect(user).to.have.property('updatedAt');
  });

  it('returns the user details', async () => {
    const { body } = await request(app)
      .post('/users')
      .send({
        name: 'Peter Gibbons',
        username: 'peter.gibbons',
      })
      .expect(201);

    expect(body).to.have.property('id');
    expect(body).to.have.property('budget', 10);
    expect(body).to.have.property('name', 'Peter Gibbons');
    expect(body).to.have.property('username', 'peter.gibbons');
    expect(body).to.have.property('createdAt');
    expect(body).to.have.property('updatedAt');
  });

  it('does not create without a name', async () => {
    const { body } = await request(app)
      .post('/users')
      .send({
        name: '',
        username: 'peter.gibbons',
      })
      .expect(400);

    expect(body).to.have.error(400, 'invalid-data', '"name" is not allowed to be empty');
  });

  it('does not create without a username', async () => {
    const { body } = await request(app)
      .post('/users')
      .send({
        name: 'Peter Gibbons',
        username: '',
      })
      .expect(400);

    expect(body).to.have.error(400, 'invalid-data', '"username" is not allowed to be empty');
  });

  it('gives 10 credits to the user', async () => {
    const { body } = await request(app)
      .post('/users')
      .send({
        name: 'Peter Gibbons',
        username: 'peter.gibbons',
      })
      .expect(201);

    expect(body).to.have.property('budget', 10);
  });

  describe('with an already created user', () => {
    beforeEach(async () => {
      await request(app)
        .post('/users')
        .send({
          name: 'Peter Gibbons',
          username: 'peter.gibbons',
        });
    });

    it('does not duplicate the username', async () => {
      const { body } = await request(app)
        .post('/users')
        .send({
          name: 'Peter Gibbons',
          username: 'peter.gibbons',
        })
        .expect(409);

      expect(body).to.have.error(409, 'username-already-taken', 'The username is already taken by another user');
    });
  });

  it('trims the username', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Peter Gibbons',
        username: ' peter.gibbons ',
      })
      .expect(201);

    const user = await db('users').first();

    expect(user).to.have.property('username', 'peter.gibbons');
  });

  it('make the username lower case', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Peter Gibbons',
        username: 'Peter.gibbons',
      })
      .expect(201);

    const user = await db('users').first();

    expect(user).to.have.property('username', 'peter.gibbons');
  });
});
