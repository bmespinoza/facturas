import { Router } from "express";

const router = Router()

router.get('/invoice/list', (_, res) => {
    res.send('Invoice list')
})

export default router;