import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import AuthService from '../services/authService';
import UserService from '../services/userService';
import { User } from '../types/user.types';

interface AuthState {
	user: User | null;
	isAuth: boolean;
	setAuth: (bool: boolean) => void;
	setUser: (user: User) => void;
	login: (email: string, password: string) => Promise<void>;
	registration: (
		email: string,
		password: string,
		name?: string
	) => Promise<void>;
	logout: () => Promise<void>;
	checkAuth: () => Promise<void>;
	isLoading: boolean;
}

const useAuthStore = create<AuthState>()(
	devtools(
		persist(
			set => ({
				user: null,
				isAuth: false,
				isLoading: false,

				setAuth: (bool: boolean) => set(() => ({ isAuth: bool })),

				setUser: (user: User) => set(() => ({ user })),

				async login(email: string, password: string) {
					try {
						const response = await AuthService.login(email, password);
						localStorage.setItem('token', response.data.accessToken);
						return set(() => ({ user: response.data.user, isAuth: true }));
					} catch (error) {
						console.log(error);
					}
				},

				async registration(email: string, password: string, name?: string) {
					try {
						const response = await UserService.registration(
							email,
							password,
							name
						);
						localStorage.setItem('token', response.data.accessToken);
						return set(() => ({ user: response.data.user, isAuth: true }));
					} catch (error) {
						console.log(error);
					}
				},

				async logout() {
					try {
						await AuthService.logout();
						localStorage.removeItem('token');
						return set(() => ({ user: null, isAuth: false }));
					} catch (error) {
						console.log(error);
					}
				},

				async checkAuth() {
					set(() => ({ isLoading: true }));
					try {
						await AuthService.refresh()
							.then(response => {
								localStorage.setItem('token', response.data.accessToken);
								return set(() => ({ user: response.data.user, isAuth: true }));
							})
							.catch(error => {
								if (error.response.status == 401) {
									localStorage.removeItem('token');
									return set(() => ({ user: null, isAuth: false }));
								}
							});
					} catch (error) {
						console.log(error);
					} finally {
						set(() => ({ isLoading: false }));
					}
				}
			}),
			{ name: 'AuthStore' }
		)
	)
);

export default useAuthStore;
