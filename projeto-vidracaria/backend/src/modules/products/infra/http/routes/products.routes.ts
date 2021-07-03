import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();
productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      quantity: Joi.number().required(),
    },
  }),
  productsController.create
);
productsRouter.get('/', productsController.index);
productsRouter.get('/:id', productsController.show);
productsRouter.delete('/:id', productsController.delete);

export default productsRouter;
