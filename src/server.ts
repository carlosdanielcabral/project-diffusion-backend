import App from './app';
import dotenv from 'dotenv';

dotenv.config();

const app = new App();
const PORT = process.env.PORT || 3001;

app.listen(Number(PORT));
