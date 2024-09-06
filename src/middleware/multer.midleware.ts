import { RequestHandler } from 'express'
import multer, { StorageEngine } from 'multer'
import { Request } from 'express'

interface MulterFile {
  originalname: string
}

const storage: StorageEngine = multer.diskStorage({
  filename: function (
    req: Request,
    file: MulterFile,
    callback: (error: Error | null, filename: string) => void
  ) {
    callback(null, file.originalname)
  }
})

export const createUploadMiddleware = (
  fields: { name: string; maxCount?: number }[]
): RequestHandler => {
  const upload = multer({ storage: storage })

  return upload.fields(fields)
}
