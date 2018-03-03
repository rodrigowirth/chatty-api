import messagesService from '../../services/messages';
import present from './present';

export default async function (req, res) {
  const service = messagesService(req.knex);
  const message = await service.create(req.body);
  res.status(201).send(present(message));
}
