import { expect } from 'chai';
import request from 'supertest';

import '../../spec-helper';
import app from '../../../src/app';

describe('get a message by id', () => {
  describe('with two users and a message', () => {
    let senderId;
    let recipientId;
    let messageId;

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

      const { body: message } = await request(app)
        .post('/messages')
        .send({
          from: senderId,
          to: recipientId,
          body: 'message',
        });

      messageId = message.id;
    });

    it('returns its detail', async () => {
      const { body } = await request(app)
        .get(`/message/${messageId}`)
        .expect(200);

      expect(body).to.have.property('id', messageId);
      expect(body).to.have.property('from', senderId);
      expect(body).to.have.property('to', recipientId);
      expect(body).to.have.property('body', 'message');
      expect(body).to.have.property('sentAt');
    });
  });

  it('handles not found messages', async () => {
    const { body } = await request(app)
      .get('/message/123')
      .expect(404);

    expect(body).to.have.error(404, 'message-not-found', 'The message was not found');
  });

  it('does not break with a bad id', async () => {
    const { body } = await request(app)
      .get('/message/xyz')
      .expect(404);

    expect(body).to.have.error(404, 'message-not-found', 'The message was not found');
  });
});
