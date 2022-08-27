import { Router } from 'express';
import multer from 'multer'

import multerConfig from '../config/multer'
import { ProductsRepository } from '../modules/Products/repositories/productsRepository';
import { CreateProductService } from '../modules/Products/services/createProductService'

const productsRoutes = Router()

const productsRepository = new ProductsRepository
const createProductService = new CreateProductService(productsRepository)

//Create product route
productsRoutes.post('/', multer(multerConfig).single("file"), async (req, res) => {
  const {originalname, key, location: image_URL = '' }: any = req.file
  const { name, description, price } = req.body

  const product = await createProductService.execute({ name, description, price, originalname, key, image_URL })

  res.json({product})
})

//List all products route
productsRoutes.get('/', async (req, res) => {
  const products = await productsRepository.list()

  res.json(products)
})

//List a specific product
productsRoutes.get('/:id', async (req, res) => {
  const { id } = req.params

  const product = await productsRepository.findByID(id)

  res.json(product)
})

productsRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params

  const productDeleted = await productsRepository.deletePost(id)

  res.status(200).json(productDeleted)
})

export { productsRoutes }
