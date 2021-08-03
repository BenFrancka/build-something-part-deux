import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import corporationController from '../lib/controllers/corporations.js';
import spaceshipController from '../lib/controllers/spaceships.js';

const app = express();

app.use(express.json());

app.use('/api/v1/corporations', corporationController);
app.use('/api/v1/spaceships', spaceshipController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
