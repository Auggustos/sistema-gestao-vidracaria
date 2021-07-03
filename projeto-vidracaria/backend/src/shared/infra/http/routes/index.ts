import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import salesRouter from '@modules/sales/infra/http/routes/sales.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import customersRouter from '@modules/customers/infra/http/routes/customers.routes';
import swaggerDocs from '@shared/infra/http/routes/swagger.json';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/sales', salesRouter);
routes.use('/products', productsRouter);
routes.use('/customers', customersRouter);
routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default routes;
