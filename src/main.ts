import { App } from './app';

async function bootstrap(): Promise<void> {
	const app = new App();
	await app.init();
}

bootstrap();
