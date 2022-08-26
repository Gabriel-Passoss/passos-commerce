import { ProductsRepository } from '../repositories/productsRepository'

interface Request {
  name: string,
  description: string,
  price: number
}

class CreateProductService {
  constructor(private ProductsRepository: ProductsRepository) {

  }

  async execute({ name, description, price }: Request) {
    const productAlreadyExists = await this.ProductsRepository.findByName(name)

    if (productAlreadyExists) {
      throw new Error(`Category ${name} already exists`)
    }

    this.ProductsRepository.create({ name, description, price })
  }
}

export { CreateProductService }