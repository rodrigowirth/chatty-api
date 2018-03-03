import usersService from '../../services/users';
import present from './present';

export default async function (req, res) {
  const service = usersService(req.knex);
  const user = await service.create(req.body);
  res.status(201).send(present(user));
}
