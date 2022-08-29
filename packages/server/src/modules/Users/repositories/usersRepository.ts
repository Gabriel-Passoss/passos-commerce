import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface CreateUserDTO {
  name: string,
  email: string,
  password: string,
  image_URL: string
}

class ProductsRepository {
  //function to create a product
  async create({ name, email , image_URL, password }: CreateUserDTO) {
    const passwordEncrypted = password
    
    await prisma.users.create({
      data: {
        name,
        email,
        image_URL,
        password: passwordEncrypted
      }
    })
  }

  //function to list all products
  async list() {
    const allProducts = await prisma.products.findMany()
    return allProducts
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
  async deleteProduct(id: string) {
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