import { expect } from 'chai';
import request from 'supertest';
import randomstring from 'randomstring';

import '../../spec-helper';
import app from '../../../src/app';

let db;
describe('send message from one user to another', () => {
  beforeEach(async function () {
    db = this.connection;
  });

  describe('given a sender and a recipient', () => {
    let senderId;
    let recipientId;

    beforeEach(async () => {
      const { body: sender } = await request(app)
        .post('/users')
        .send({
          name: 'Sender',
          username: 'sender',
        });

      senderId = sender.id;

      const { body: recipient } = await request(app)
        .post('/users')
        .send({
          name: 'Recipient',
          username: 'recipient',
        });

      recipientId = recipient.id;
    });

    it('creates', async () => {
      await request(app)
        .post('/messages')
        .send({
          from: senderId,
          to: recipientId,
          body: 'message',
        })
        .expect(201);

      const message = await db('messages').first();

      expect(message).to.have.property('id');
      expect(message).to.have.property('from', parseInt(senderId, 10));
      expect(message).to.have.property('to', parseInt(recipientId, 10));
      expect(message).to.have.property('body', 'message');
      expect(message).to.have.property('sentAt');
    });

    it('returns the details', async () => {
      const { body } = await request(app)
        .post('/messages')
        .send({
          from: senderId,
          to: recipientId,
          body: 'message',
        })
        .expect(201);

      expect(body).to.have.property('id');
      expect(body).to.have.property('from', senderId);
      expect(body).to.have.property('to', recipientId);
      expect(body).to.have.property('body', 'message');
      expect(body).to.have.property('sentAt');
    });

    it('does not create without a body', async () => {
      const { body } = await request(app)
        .post('/messages')
        .send({
          from: senderId,
          to: recipientId,
          body: '',
        })
        .expect(400);

      expect(body).to.have.error(400, 'invalid-data', '"body" is not allowed to be empty');
    });

    it('does not create without a sender', async () => {
      const { body } = await request(app)
        .post('/messages')
        .send({
          from: '',
          to: recipientId,
          body: 'message',
        })
        .expect(400);

      expect(body).to.have.error(400, 'invalid-data', '"from" is not allowed to be empty');
    });

    it('does not create without a recipient', async () => {
      const { body } = await request(app)
        .post('/messages')
        .send({
          from: senderId,
          to: '',
          body: 'message',
        })
        .expect(400);

      expect(body).to.have.error(400, 'invalid-data', '"to" is not allowed to be empty');
    });

    it('does not create with a body with more than 200 chars', async () => {
      const { body } = await request(app)
        .post('/messages')
        .send({
          from: senderId,
          to: recipientId,
          body: randomstring.generate({ length: 201 }),
        })
        .expect(400);

      expect(body).to.have.error(400, 'invalid-data', '"body" length must be less than or equal to 200 characters long');
    });

    it('does not create from a nonexistent sender', async () => {
      const { body } = await request(app)
        .post('/messages')
        .send({
          from: '123',
          to: recipientId,
          body: 'message',
        })
        .expect(404);

      expect(body).to.have.error(404, 'sender-not-found', 'the sender does not exist');
    });

    it('does not create to a nonexistent recipient', async () => {
      const { body } = await request(app)
        .post('/messages')
        .send({
          from: senderId,
          to: '123',
          body: 'message',
        })
        .expect(404);

      expect(body).to.have.error(404, 'recipient-not-found', 'the recipient does not exist');
    });

    it('charges 1 credit from recipients budget', async () => {
      await request(app)
        .post('/messages')
        .send({
          from: senderId,
          to: recipientId,
          body: 'message',
        })
        .expect(201);

      const recipient = await db('users')
        .where({ id: recipientId })
        .first();

      expect(recipient.budget).to.be.eql(9);
    });

    describe('the recipient has no budget', () => {
      beforeEach(async () => {
        await db('users')
          .update({ budget: 0 })
          .where({ id: recipientId });
      });

      it('does not charge 1 credit from recipients budget', async () => {
        await request(app)
          .post('/messages')
          .send({
            from: senderId,
            to: recipientId,
            body: 'message',
          })
          .expect(201);

        const recipient = await db('users')
          .where({ id: recipientId })
          .first();

        expect(recipient.budget).to.be.eql(0);
      });
    });
  });
});
