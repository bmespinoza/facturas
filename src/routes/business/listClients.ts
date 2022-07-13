import { Router } from 'express';
import multer from 'multer';
import { listClients } from '../../services/listClients';

const listClientsRouter = Router();

const upload = multer({ dest: 'tmp' });

listClientsRouter.post('/listClients', upload.single('file'), async (req, res) => {
  if (req.body.businessId === undefined || req.body.startDate === undefined || req.body.endDate === undefined) {
    return res.status(400).send({
      message: 'Some parameters are missing!',
    });
  }
  if (req.file) {
    try {
      const results = await listClients(req.file, req.body.businessId, req.body.startDate, req.body.endDate);
      res.send(results);
    } catch (e: unknown) {
      return res.status(400).send({
        message: (e as Error).message,
      });
    }
  } else {
    return res.status(400).send({
      message: 'File is missing!',
    });
  }
});

export default listClientsRouter;
