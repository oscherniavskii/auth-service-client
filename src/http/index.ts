import axios from 'axios';
import AuthService from '../services/authService';

export const API_URL = 'http://localhost:5000/api';

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL
});

$api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

	return config;
});

$api.interceptors.response.use(
	config => {
		return config;
	},
	async error => {
		const originalRequest = error.config;

		if (
			error.response.status == 401 &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true;
			try {
				const response = await AuthService.refresh();
				localStorage.setItem('token', response.data.accessToken);

				return $api.request(originalRequest);
			} catch (error) {
				console.log('Unauthorized!', error);
			}
		}

		throw error;
	}
);

export default $api;
