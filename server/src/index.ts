import 'reflect-metadata';
import { server } from './core/server';

const port = 80;

server
  .build()
  .listen(port, () => console.log(`listenning on http://localhost:${port}`));

