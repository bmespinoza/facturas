import express from 'express';
import invoiceRouter from './routes/index';

const PORT = 3000

const app = express()

app.use(express.json())

app.get('/', (_, res) => {
    console.log('hola')
    res.send('wena')
})

app.use('/api/invoice', invoiceRouter)

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})

