import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import cron from 'node-cron';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import { UserServices } from './app/modules/User/User.services';
import router from './app/routes';
const app: Application = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://charukon.vercel.app',
  'https://charukon-dashboard.vercel.app',
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

// parser
app.use(express.json());
app.use(cookieParser());

// delete users that are not confirmed in 30 minutes
cron.schedule('* * * * *', async () => {
  try {
    await UserServices.deleteUnconfirmedUsers();
  } catch (error) {
    console.error(
      'Failed to delete users those did not confirm their email in 30 minutes!',
      error,
    );
  }
});

// application routes
app.use('/api', router);

// test api
app.get('/', (req: Request, res: Response) => {
  res.send('server is up and running!');
});

// global error handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
