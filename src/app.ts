import { Server } from 'http';
import express, { Express } from 'express';
import { userRouter } from './users/users';
import { LoggerService } from './logger/logger.service';

export class App {
	app: Express;
	server: Server;
	port: number;
	logger: LoggerService;

	constructor(logger: LoggerService) {
		this.app = express();
		this.port = 8000;
		this.logger = logger;
	}

	useRoutes(): void {
		this.app.use('/users', userRouter);
	}

	public async init(): Promise<void> {
		this.useRoutes();

		this.server = this.app.listen(this.port);
		this.logger.log(`The server is running on http://localhost:${this.port}`);
	}
}
