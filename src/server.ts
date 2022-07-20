import dotenv from 'dotenv';
import App from './app';

dotenv.config();

const app = new App();
const PORT = process.env.PORT || 3001;

app.listen(Number(PORT));
