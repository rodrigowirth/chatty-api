import { expect } from 'chai';
import request from 'supertest';

import '../../spec-helper';
import app from '../../../src/app';

describe('get a user by id', () => {
  describe('with an user', () => {
    let userId;

    beforeEach(async () => {
      const { body } = await request(app)
        .post('/users')
        .send({
          name: 'Peter Gibbons',
          username: 'peter.gibbons',
        });

      userId = body.id;
    });

    it('returns its detail', async () => {
      const { body } = await request(app)
        .get(`/users/${userId}`)
        .expect(200);

      expect(body).to.have.property('id', userId);
      expect(body).to.have.property('budget', 10);
      expect(body).to.have.property('name', 'Peter Gibbons');
      expect(body).to.have.property('username', 'peter.gibbons');
      expect(body).to.have.property('createdAt');
      expect(body).to.have.property('updatedAt');
    });
  });

  it('handles not found users', async () => {
    const { body } = await request(app)
      .get('/users/123')
      .expect(404);

    expect(body).to.have.property('title', 'user-not-found');
    expect(body).to.have.property('status', 404);
    expect(body).to.have.property('detail', 'The user was not found');
  });

  it('does not break with a bad id', async () => {
    const { body } = await request(app)
      .get('/users/xyz')
      .expect(404);

    expect(body).to.have.property('title', 'user-not-found');
    expect(body).to.have.property('status', 404);
    expect(body).to.have.property('detail', 'The user was not found');
  });
});
