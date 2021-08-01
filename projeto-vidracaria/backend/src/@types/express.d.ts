declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    s3File?: Express.MulterS3.File
  }
}
