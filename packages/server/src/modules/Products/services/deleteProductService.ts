import { PrismaClient } from '@prisma/client'
import aws from 'aws-sdk'

import { ProductsRepository } from '../repositories/productsRepository'

const prisma = new PrismaClient()

interface Request {
  id: string
}

const s3 = new aws.S3({
  region: 'us-east-1'
})

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
      await s3.deleteObject({
        Bucket: 'passos-commerce',
        Key: productAlreadyExists.key,
      }).promise()
      const message = `Product deleted successfully`
      return { message }
    }
  }
}

export { DeleteProductService }