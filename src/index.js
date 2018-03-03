import app from './app';

export default async function start() {
  app.listen(3000, () => {
    console.info('Server started at [ http://localhost:3000 ]'); // eslint-disable-line no-console
  });
}
