import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}


export default function addFilename(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    try {

        if (process.env.STORAGE_DRIVER == 's3') {
            request.s3File = request.file as Express.MulterS3.File;
        }
        return next();
    } catch (error) {
        next(error);
    }
}
