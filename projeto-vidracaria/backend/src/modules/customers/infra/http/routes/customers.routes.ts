import { Router } from 'express';

import CustomersController from '../controllers/CustomersController';

const costumersRouter = Router();
const customersController = new CustomersController();
costumersRouter.post('/', customersController.create);
costumersRouter.get('/', customersController.index);
costumersRouter.get('/:id', customersController.show);
// costumersRouter.delete('/:id', customersController.delete);

export default costumersRouter;
