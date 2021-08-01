import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import ServiceController from '../controllers/ServiceController';


const servicesRouter = Router();
const serviceController = new ServiceController();

servicesRouter.get('/', ensureAuthenticated, serviceController.index);
servicesRouter.get('/:id', ensureAuthenticated, serviceController.show);
servicesRouter.delete('/:id', ensureAuthenticated, serviceController.delete);

servicesRouter.post('/', celebrate({
    [Segments.BODY]: {
        customer_id: Joi.string().uuid().required(),
        date: Joi.date().required(),
        place: Joi.string().required(),
        type: Joi.number().required(),
        value: Joi.number().required(),
        status: Joi.number().required()
    },
}), ensureAuthenticated, serviceController.create);
servicesRouter.put('/', celebrate({
    [Segments.BODY]: {
        id: Joi.string().uuid().required(),
        customer_id: Joi.string().uuid().required(),
        date: Joi.date(),
        place: Joi.string(),
        type: Joi.number(),
        value: Joi.number(),
        status: Joi.number()

    },
}), ensureAuthenticated, serviceController.update)

export default servicesRouter;
