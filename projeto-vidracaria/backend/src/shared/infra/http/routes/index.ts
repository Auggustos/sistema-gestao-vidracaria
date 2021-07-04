import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import customersRouter from '@modules/customers/infra/http/routes/customers.routes';
import swaggerDocs from '@shared/infra/http/routes/swagger.json';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/customers', customersRouter);
routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default routes;
