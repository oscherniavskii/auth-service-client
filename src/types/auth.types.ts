import { User } from './user.types';

export interface AuthResponse {
	accessToken: string;
	refreshToken: string;
	user: User;
}

export interface LogoutResponse {
	message: string;
}
