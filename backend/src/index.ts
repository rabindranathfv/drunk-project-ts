import App from './app';
import validateEnv from './utils/validateEnvs';
import userRoute from './routes/user.route';

validateEnv();

const app = new App([new userRoute()]);

app.listen();
