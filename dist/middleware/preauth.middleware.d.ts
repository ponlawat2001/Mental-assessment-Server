import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
declare class PreauthMiddleware implements NestMiddleware {
    private defaultAppadmin;
    constructor();
    private accessDenied;
    private unauthorized;
    use(req: Request, res: Response, next: Function): void;
}
export default PreauthMiddleware;
