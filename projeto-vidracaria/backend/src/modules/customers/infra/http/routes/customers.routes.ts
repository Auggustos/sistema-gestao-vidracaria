import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import CustomersController from '../controllers/CustomersController';

const costumersRouter = Router();
const customersController = new CustomersController();
costumersRouter.post('/', customersController.create);
costumersRouter.get('/', customersController.index);
costumersRouter.get('/:id', customersController.show);
costumersRouter.delete('/:id', customersController.delete);
costumersRouter.put('/', celebrate({
    [Segments.BODY]: {
        id: Joi.string().uuid().required(),
        name: Joi.string(),
        description: Joi.string(),
        quantity: Joi.number(),

    },
}), ensureAuthenticated, customersController.update);

export default costumersRouter;
