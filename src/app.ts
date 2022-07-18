import express from 'express';
import cors from 'cors';

class App {
  private _app = express();

  config = () => {
    this._app.use(express.json());
    this._app.use(cors());
  };

  listen = (port: number) => 
    this._app.listen(port, () => console.log(`Aplicação online na porta ${port}`));
}

export default App;
