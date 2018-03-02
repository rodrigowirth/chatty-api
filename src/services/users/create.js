import { BadRequestError } from 'meaning-error';


// import createDebug from '../../debug';

// const debug = createDebug('services:achievement:enabled');

export default async function (knex, data) {
  // debug.log('setting enabled for achievement %d with data %o', id, data);
  //
  // await validate(data);
  //
  // return repositories
  //   .achievement
  //   .updateBy({ id }, { enabled: data.enabled });

  const sanitized = {
    name: data.name,
    username: data.username,
  };

  sanitized.budget = 10;

  if (!sanitized.name) {
    throw new BadRequestError('Name is a required field', 'missing-name');
  }

  if (!sanitized.username) {
    throw new BadRequestError('Username is a required field', 'missing-username');
  }

  const [user] = await knex('users')
    .insert(sanitized)
    .returning('*');


  return user;
}

// async function validate (data) {
//   const schema = {
//     enabled: [
//       { validator: Valida.Validator.required },
//       { validator: Valida.Validator.bool },
//     ],
//   };
//
//   const result = await Valida.process(data, schema);
//   if (!result.isValid()) {
//     throw new BadRequestError(
//       'Your data seems to not be valid',
//       result.invalidError().validationErrors,
//     );
//   }
// }
