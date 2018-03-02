import { expect } from 'chai';
import request from 'supertest';

import '../../spec-helper';
import app from '../../../src/app';

let db;
describe('create users api', () => {
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

    expect(body).to.have.property('title', 'missing-name');
    expect(body).to.have.property('status', 400);
    expect(body).to.have.property('detail', 'Name is a required field');
  });

  it('does not create without a username', async () => {
    const { body } = await request(app)
      .post('/users')
      .send({
        name: 'Peter Gibbons',
        username: '',
      })
      .expect(400);

    expect(body).to.have.property('title', 'missing-username');
    expect(body).to.have.property('status', 400);
    expect(body).to.have.property('detail', 'Username is a required field');
  });

  xit('gives 10 credits to the user', () => {
  });

  describe('given an user', () => {
    xit('does not duplicate the username', () => {
    });
  });
});
