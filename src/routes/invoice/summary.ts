import { Router } from "express";

const router = Router()

router.get('/invoice/summary', (_, res) => {
    res.send('Invoice Summary')
})

router.get('/invoice/clients', (_, res) => {
    res.send('Invoice clients')
})

export default router;