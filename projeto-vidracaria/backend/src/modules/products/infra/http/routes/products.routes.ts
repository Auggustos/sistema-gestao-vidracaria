import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import { celebrate, Segments, Joi } from 'celebrate';
import ProductsController from '../controllers/ProductsController';
import { join } from 'path/posix';

const upload = multer(uploadConfig.multer);

const productsRouter = Router();
const productsController = new ProductsController();
productsRouter.post(
  '/',
  upload.single('image'),
  productsController.create
);
productsRouter.get('/', productsController.index);
productsRouter.get('/:id', productsController.show);
productsRouter.delete('/:id', productsController.delete);

export default productsRouter;
