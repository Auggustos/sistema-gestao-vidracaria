import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import { celebrate, Segments, Joi } from 'celebrate';
import ProductsController from '../controllers/ProductsController';
import { join } from 'path/posix';
import addFilename from '../middlewares/addFileName';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const upload = multer(uploadConfig.multer);

const productsRouter = Router();
const productsController = new ProductsController();
productsRouter.post(
  '/',
  upload.single('image'),
  addFilename,
  productsController.create
);
productsRouter.get('/', productsController.index);
productsRouter.get('/:id', productsController.show);
productsRouter.delete('/:id', ensureAuthenticated, productsController.delete);
productsRouter.put('/', celebrate({
  [Segments.BODY]: {
    id: Joi.string().uuid().required(),
    name: Joi.string(),
    description: Joi.string(),
    quantity: Joi.number(),

  },
}), ensureAuthenticated, productsController.update)

export default productsRouter;
