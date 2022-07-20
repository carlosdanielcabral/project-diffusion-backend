import express, { Express } from 'express';
import cors from 'cors';
import RouteFactory from './factories/RouteFactory';
import ErrorMiddleware from './middlewares/ErrorMiddleware';

class App {
  private _app: Express;

  constructor() {
    this._app = express();

    this._app.get('/', (req, res) => res.status(200).json({ runnig: true }))
    this.config();
  }

  get app() {
    return this._app;
  }

  config = () => {
    this._app.use(express.json());
    this._app.use(cors());
    const route = RouteFactory();
    this._app.use('/', route.router);
    this._app.use(ErrorMiddleware);
  };

  listen = (port: number) => 
    this._app.listen(port, () => console.log(`Aplicação online na porta ${port}`));
}

export default App;
