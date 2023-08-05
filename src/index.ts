import express from 'express';
import serverConfig from './config/server';
import notesRouter from './routes/notesRouter';

const app = express();

app.use('/notes', notesRouter);

app.listen(serverConfig.port, () => {
  console.log('The server is running...');
});