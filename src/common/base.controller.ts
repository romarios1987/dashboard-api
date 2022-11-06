import 'reflect-metadata';
import { injectable } from 'inversify';
import { Response, Router } from 'express';
import { ExpressReturnType, IRoute } from './route.interface';
import { ILogger } from '../logger/logger.interface';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T): void {
		res.type('application/json');
		res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): void {
		return this.send<T>(res, 200, message);
	}

	public created(res: Response): ExpressReturnType {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: IRoute[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`);

			const middleware = route.middlewares?.map((m) => m.execute.bind(m));

			// save context
			const handler = route.func.bind(this);

			const pipeline = middleware ? [...middleware, handler] : handler;

			this.router[route.method](route.path, pipeline);
		}
	}
}
