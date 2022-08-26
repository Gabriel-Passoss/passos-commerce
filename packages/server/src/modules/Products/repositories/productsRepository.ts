import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface CreateProductDTO {
  name: string,
  description: string,
  price: number
}

class ProductsRepository {
  //function to create a product
  async create({ name, description, price }: CreateProductDTO) {
    await prisma.products.create({
      data: {
        name,
        description,
        price,
      }
    })
  }

  //function to list all products
  async list() {
    const allProducts = await prisma.products.findMany()
    console.log(allProducts)
    return await prisma.products.findMany()
  }

  //function to find and product by name
  async findByName(name: string) {
    const product = await prisma.products.findUnique({
      where: {
        name: name
      }
    })
    return product
  }

  async findByID(id: string) {
    const idNumber = Number(id)
    const product = await prisma.products.findUnique({
      where: {
        id: idNumber
      }
    })
    return product
  }
}

export { ProductsRepository }