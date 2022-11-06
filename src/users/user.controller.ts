import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { IUserController } from './user.controller.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login },
			{ path: '/register', method: 'post', func: this.register },
		]);
	}

	login(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'login');
	}
	register(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'register');
	}
}
