import messageService from '../../services/messages';
import present from './present';

export default async function (req, res) {
  const service = messageService(req.knex);
  const user = await service.list(req.query);
  res.status(200).send(present(user));
}
