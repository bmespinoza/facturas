import { Router } from 'express';
import multer from 'multer';
import { summary } from '../../services/summary';

const summaryRouter = Router();
const upload = multer({ dest: 'tmp' });

summaryRouter.post('/summary', upload.single('file'), async (req, res) => {
  if (req.body.businessId === undefined || req.body.date === undefined) {
    return res.status(400).send({
      message: 'Some parameters are missing!',
    });
  }
  if (req.file) {
    try {
      const results = await summary(req.file, req.body.businessId, req.body.date);
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

export default summaryRouter;
