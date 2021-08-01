import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import SalesController from '../controllers/SalesController';


const salesRouter = Router();
const salesController = new SalesController();

salesRouter.get('/', ensureAuthenticated, salesController.index);
salesRouter.get('/:id', ensureAuthenticated, salesController.show);
salesRouter.delete('/:id', ensureAuthenticated, salesController.delete);

salesRouter.post('/', celebrate({
    [Segments.BODY]: {
        customer_id: Joi.string().uuid().required(),
        value: Joi.number(),
        itens: Joi.string(),
        payment_type: Joi.number(),
        paid: Joi.number(),

    },
}), ensureAuthenticated, salesController.create);
salesRouter.put('/', celebrate({
    [Segments.BODY]: {
        id: Joi.string().uuid().required(),
        customer_id: Joi.string().uuid().required(),
        value: Joi.number(),
        itens: Joi.string(),
        payment_type: Joi.number(),
        paid: Joi.number(),

    },
}), ensureAuthenticated, salesController.update)

export default salesRouter;
