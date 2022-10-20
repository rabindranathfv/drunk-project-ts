import App from './app';
import validateEnv from './utils/validateEnvs';
import UserRoute from './routes/user.route';
import AuthRoute from './routes/auth.route';

validateEnv();

const app = new App([new UserRoute(), new AuthRoute()]);

app.listen();
