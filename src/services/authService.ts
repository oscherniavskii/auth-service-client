import axios, { AxiosResponse } from 'axios';
import $api, { API_URL } from '../http';
import { AuthResponse, LogoutResponse } from '../types/auth.types';

export default class AuthService {
	static async login(
		email: string,
		password: string
	): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/auth/login', { email, password });
	}

	static async logout(): Promise<AxiosResponse<LogoutResponse>> {
		return $api.post<LogoutResponse>('/auth/logout');
	}

	static async refresh(): Promise<AxiosResponse<AuthResponse>> {
		return axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {
			withCredentials: true
		});
	}
}
