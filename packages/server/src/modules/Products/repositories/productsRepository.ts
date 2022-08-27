import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface CreateProductDTO {
  name: string,
  description: string,
  price: number,
  originalname: string,
  key: string,
  image_URL: string
}

class ProductsRepository {
  //function to create a product
  async create({ name, description, price, originalname, key, image_URL }: CreateProductDTO) {
    const priceToNumber = Number(price)
    await prisma.products.create({
      data: {
        name,
        description,
        price: priceToNumber,
        originalname,
        key,
        image_URL,
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
    const idToNumber = Number(id)
    const product = await prisma.products.findUnique({
      where: {
        id: idToNumber
      }
    })
    return product
  }

  //Make error handling and delete image in the future
  async deletePost(id: string) {
    const idToNumber = Number(id)
    const productDeleted = await prisma.products.delete({
      where: {
        id: idToNumber
      }
    })
    return productDeleted
  }
}

export { ProductsRepository }