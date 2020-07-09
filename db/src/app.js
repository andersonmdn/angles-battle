import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';

//importing route
import projectRoutes from './routes/ranking';

//initialization
const app = express();

//middleware
app.use(morgan('dev'));
app.use(json());
app.use(cors());

//routes
app.use('/api/ranking', projectRoutes);

export default app;