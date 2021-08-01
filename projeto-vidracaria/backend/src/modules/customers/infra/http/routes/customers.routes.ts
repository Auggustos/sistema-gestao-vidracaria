import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import CustomersController from '../controllers/CustomersController';

const costumersRouter = Router();
const customersController = new CustomersController();
costumersRouter.post('/', ensureAuthenticated, customersController.create);
costumersRouter.get('/', ensureAuthenticated, customersController.index);
costumersRouter.get('/:id', ensureAuthenticated, customersController.show);
costumersRouter.delete('/:id', ensureAuthenticated, customersController.delete);
costumersRouter.put('/', celebrate({
    [Segments.BODY]: {
        id: Joi.string().uuid().required(),
        name: Joi.string(),
        phone: Joi.string(),
        address: Joi.string(),
        type: Joi.number(),

    },
}), ensureAuthenticated, customersController.update);

export default costumersRouter;
