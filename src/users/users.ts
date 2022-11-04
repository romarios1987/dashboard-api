import { Router } from 'express';

const userRouter = Router();

userRouter.use((req, res, next) => {
	console.log('User handler');
	next();
});

userRouter.post('/login', (req, res) => {
	res.send('Login');
});

userRouter.post('/register', (req, res) => {
	res.send('Register');
});

export { userRouter };
