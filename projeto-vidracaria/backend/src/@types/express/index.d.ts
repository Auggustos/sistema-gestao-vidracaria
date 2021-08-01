import * as express from "express"

declare global {
  namespace Express {
    interface Request {
      s3File?: Record<Express.MulterS3, any>
    }
  }
}