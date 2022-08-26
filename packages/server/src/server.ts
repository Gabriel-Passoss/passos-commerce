import express from 'express'
import { productsRoutes } from './routes/products.routes'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.json({message: "Hello world"})
})

app.use('/products', productsRoutes)

app.listen(3333)