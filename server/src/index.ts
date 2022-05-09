import 'reflect-metadata';
import { server } from './core/server';

const port = 3000;

server
  .build()
  .listen(port, () => console.log(`listenning on http://localhost:${port}`));