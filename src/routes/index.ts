import { Router } from 'express';
import listClientsRouter from './business/listClients';
import summaryRouter from './business/summary';

const router = Router();

const routes: Record<string, Router> = {
  summary: summaryRouter,
  listClients: listClientsRouter,
};

for (const route of Object.values(routes)) {
  router.use('/business/', route);
}

export default router;
