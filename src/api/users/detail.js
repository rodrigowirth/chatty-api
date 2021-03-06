import usersService from '../../services/users';
import present from './present';

export default async function (req, res) {
  const service = usersService(req.knex);
  const user = await service.detail(req.params.id);
  res.status(200).send(present(user));
}
