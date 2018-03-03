import { expect } from 'chai';
import request from 'supertest';

import '../../spec-helper';
import app from '../../../src/app';

let db;
describe('list the messages a user has received', () => {
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

    describe('given two messages to the recipient', () => {
      beforeEach(async () => {
        await db('messages')
          .insert([
            { from: senderId, to: recipientId, body: 'message 1' },
            { from: senderId, to: recipientId, body: 'message 2' },
          ]);
      });

      it('returns two messages for recipient', async () => {
        const { body } = await request(app)
          .get(`/messages?to=${recipientId}`)
          .expect(200);

        expect(body).to.have.property('messages');

        const { messages } = body;
        expect(messages).to.have.length(2);
        expect(messages[0]).to.have.property('id');
        expect(messages[0]).to.have.property('from', senderId);
        expect(messages[0]).to.have.property('to', recipientId);
        expect(messages[0]).to.have.property('body', 'message 1');
        expect(messages[0]).to.have.property('sentAt');
        expect(messages[1]).to.have.property('id');
        expect(messages[1]).to.have.property('from', senderId);
        expect(messages[1]).to.have.property('to', recipientId);
        expect(messages[1]).to.have.property('body', 'message 2');
        expect(messages[1]).to.have.property('sentAt');
      });

      it('returns no messages for sender', async () => {
        const { body } = await request(app)
          .get(`/messages?to=${senderId}`)
          .expect(200);

        expect(body).to.have.property('messages');

        const { messages } = body;
        expect(messages).to.have.length(0);
      });
    });

    it('does not list without "to" attribute', async () => {
      const { body } = await request(app)
        .get('/messages')
        .expect(400);

      expect(body).to.have.error(400, 'invalid-data', '"to" is required');
    });

    it('handles not found recipient', async () => {
      const { body } = await request(app)
        .get('/messages?to=123')
        .expect(404);

      expect(body).to.have.error(404, 'recipient-not-found', 'the recipient does not exist');
    });

    it('does not break with an invalid recipient id', async () => {
      const { body } = await request(app)
        .get('/messages?to=abc')
        .expect(400);

      expect(body).to.have.error(400, 'invalid-data', '"to" must be a number');
    });
  });
});
