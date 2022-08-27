require("dotenv").config()
import express from 'express'
import path from 'path'

import { productsRoutes } from './routes/products.routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))

app.get('/', (req, res) => {
  return res.json({message: "Hello world"})
})

app.use('/products', productsRoutes)

app.listen(3333)