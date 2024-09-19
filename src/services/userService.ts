import { AxiosResponse } from 'axios';
import $api from '../http';
import { AuthResponse } from '../types/auth.types';
import { User } from '../types/user.types';

export default class UserService {
	static async registration(
		email: string,
		password: string,
		name?: string
	): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/user/registration', {
			email,
			password,
			name
		});
	}

	static async getAllUsers(): Promise<AxiosResponse<User[]>> {
		return $api.get<User[]>('/user/all');
	}
}
