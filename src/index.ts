import express from 'express';
import swaggerUi from 'swagger-ui-express';
import router from './routes';
import swaggerSetup from './docs/swagger';

const PORT = 3000;

export const app = express();

app.use(express.json());

app.get('/', (_, res) => {
  res.send('Conectado correctamente');
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup));
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
