import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import multerS3 from 'multer-s3'
import { S3Client } from '@aws-sdk/client-s3'

const s3 = new S3Client({
  region: 'us-east-1',
})

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
    },
    filename: (req, file: any, cb) => {
      crypto.randomBytes(5, (err, hash) => {
        file.key = `${hash.toString('hex')}-${file.originalname}`
        
        cb(null, file.key)
      })
    }
  }),
  s3: multerS3({
    s3: s3,
    bucket: 'passos-commerce',
    contentType: multerS3.DEFAULT_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(5, (err, hash) => {
        const filename = `${hash.toString('hex')}-${file.originalname}`
        
        cb(null, filename)
      })
    }
  })
}

export default {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes['s3'],
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req: any, file: any, cb: any) => {
    const allowedMimes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
    ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error("Invalid file type."))
    }
  }
}