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
      const message = `Product ${name} already exists`
      return {message}

    }else {
      const message = `Product ${name} created successfully`
      this.ProductsRepository.create({ name, description, price })
      return {message}
    }
  }
}

export { CreateProductService }