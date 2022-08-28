import { PrismaClient } from '@prisma/client'
import { ProductsRepository } from '../repositories/productsRepository'

const prisma = new PrismaClient()

interface Request {
  id: string
}

class DeleteProductService {
  constructor(private ProductsRepository: ProductsRepository) {
  }

  async execute({ id }: Request) {
    const idToNumber = Number(id)
    const productAlreadyExists = await prisma.products.findUnique({
      where: {
        id: idToNumber
      }
    })

    if (!productAlreadyExists) {
      const message = `This product doesn't exists`
      return { message }

    } else {
      this.ProductsRepository.deleteProduct(id)
      const message = `Product deleted successfully`
      return { message }
    }
  }
}

export { DeleteProductService }