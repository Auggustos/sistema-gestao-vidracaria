import multer, { StorageEngine } from 'multer';
import multerS3 from 'multer-s3'
import path from 'path';
import aws from 'aws-sdk'
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine
  };

  config: {
    disk: {};
    aws: {
      bucket: string;
    }
  }
}

const storageTypes = {
  "local": multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName)
    }
  }),

  "s3": multerS3({
    s3: new aws.S3(),
    bucket: 'app-gestaovidracaria',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, callback) => {

      const fileHash = crypto.randomBytes(10).toString('hex');

      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);

    },

  }),
}

const driver = process.env.STORAGE_DRIVER == "s3" ?
  "s3" :
  "local"


export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: storageTypes[driver],
  },

  config: {
    disk: {},
    aws: {
      bucket: 'app-gestaovidracaria',
    },
  },
} as IUploadConfig;
