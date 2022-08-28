import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

prisma.$use(async (params, next) => {
  if (params.model === 'Products' && params.action === "create") {
    if (!params.args.data.image_URL) {
      params.args.data.image_URL = `http://localhost:3000/files/${params.args.data.key}`
    }

    const result = await next(params)
    return result
  }
})