import messagesService from '../../services/messages';
import present from './present';

export default async function (req, res) {
  const service = messagesService(req.knex);
  const message = await service.detail(req.params.id);
  res.status(200).send(present(message));
}
