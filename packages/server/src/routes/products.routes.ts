import { Router } from 'express';
import { ProductsRepository } from '../modules/Products/repositories/productsRepository';
import { CreateProductService } from '../modules/Products/services/createProductService'

const productsRoutes = Router()

const productsRepository = new ProductsRepository
const createProductService = new CreateProductService(productsRepository)

//Create product route
productsRoutes.post('/', async (req, res) => {
  const { name, description, price } = req.body

  const product = await createProductService.execute({ name, description, price })

  res.json(product)
})

//List all products route
productsRoutes.get('/', async (req, res) => {
  const products = await productsRepository.list()

  res.json(products)
})

productsRoutes.get('/:id', async (req, res) => {
  const { id } = req.params

  const product = await productsRepository.findByID(id)

  res.json(product)
})

export { productsRoutes }
