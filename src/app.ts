import { Server } from 'http';
import express, { Express } from 'express';
import { userRouter } from './users/users';

export class App {
	app: Express;
	server: Server;
	port: number;

	constructor() {
		this.app = express();
		this.port = 8000;
	}

	useRoutes(): void {
		this.app.use('/users', userRouter);
	}

	public async init(): Promise<void> {
		this.useRoutes();

		this.server = this.app.listen(this.port);
		console.log('Server start');
	}
}
