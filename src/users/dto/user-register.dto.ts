import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Email is incorrect.' })
	email: string;

	@IsString()
	name: string;

	@IsString()
	password: string;
}
