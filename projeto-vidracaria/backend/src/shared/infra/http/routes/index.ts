import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import customersRouter from '@modules/customers/infra/http/routes/customers.routes';
import swaggerDocs from '@shared/infra/http/routes/swagger.json';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import salesRouter from '@modules/sales/infra/http/routes/sales.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/auth', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/customers', customersRouter);
routes.use('/sales', salesRouter);
routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default routes;
