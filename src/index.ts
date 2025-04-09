import app from './app';
import { Request, Response } from 'express';

const port = app.get('port');

app.listen(port, () => {
  console.log(
    `Server is running on port: ${port}, and ready to accept requests`,
  );
});

app.get('/', (req: Request, res: Response) => {
  res.send('hello home');
});
