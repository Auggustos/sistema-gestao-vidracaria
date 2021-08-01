import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';
import ListServicesService from '@modules/services/services/ListServicesService';
import CreateServiceService from '@modules/services/services/CreateServiceService';
import ShowServiceService from '@modules/services/services/ShowServiceService';
import SoftDeleteServiceService from '@modules/services/services/SoftDeleteServiceService';
import UpdateServiceService from '@modules/services/services/UpdateServiceService';


export default class ServiceController {


    public async index(request: Request, response: Response): Promise<Response> {
        const listServices = container.resolve(ListServicesService);

        const services = await listServices.execute();

        return response.json({ results: classToClass(services) });
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { customer_id,
            date,
            place,
            type,
            value,
            status,
        } = request.body;

        const createService = container.resolve(CreateServiceService);

        const service = await createService.execute({
            customer_id,
            date,
            place,
            type,
            value,
            status,

        });

        return response.json(classToClass(service));
    }


    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showService = container.resolve(ShowServiceService);

        const service = await showService.execute(id);

        return response.json(classToClass(service));
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const deleteService = container.resolve(SoftDeleteServiceService);

        const service = await deleteService.execute({
            id,
        });

        return response.json(classToClass(service));
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const {
            id,
            customer_id,
            date,
            place,
            type,
            value,
            status,
        } = request.body;

        const updateService = container.resolve(UpdateServiceService);

        const service = await updateService.execute({
            id,
            customer_id,
            date,
            place,
            type,
            value,
            status,
        })


        return response.json(classToClass(service));
    }





}
