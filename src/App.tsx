import { useEffect, useState } from 'react';
import AuthForm from './components/AuthForm';
import UserService from './services/userService';
import useAuthStore from './store/authStore';
import { User } from './types/user.types';

function App() {
	const [isLogin, setIsLogin] = useState(false);
	const [users, setUsers] = useState<User[]>([]);
	const checkAuth = useAuthStore(state => state.checkAuth);
	const isAuth = useAuthStore(state => state.isAuth);
	const user = useAuthStore(state => state.user);
	const logout = useAuthStore(state => state.logout);
	const isLoading = useAuthStore(state => state.isLoading);

	const getUsers = async () => {
		try {
			const response = await UserService.getAllUsers();
			if (response) setUsers(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (localStorage.getItem('token')) {
			checkAuth();
		}
	}, []);
	return (
		<>
			{isAuth ? (
				<button onClick={() => logout()}>Выход</button>
			) : (
				<>
					<button className='login' onClick={() => setIsLogin(!isLogin)}>
						{isLogin ? 'Регистрация' : 'Вход'}
					</button>
					<h1>
						Форма <br />
						{isLogin ? 'входа' : 'регистрации'}
					</h1>
					{isLogin && !isAuth ? <AuthForm /> : <AuthForm type='registration' />}
				</>
			)}

			{isLoading ? (
				<div>Loading...</div>
			) : (
				<div>
					{isAuth ? (
						<>
							<p>Пользователь авторизован {user?.email}</p>
							<p>
								Пользователь {user?.isActivated ? 'активирован' : 'неактивный'}
							</p>
						</>
					) : (
						'Пользователь неавторизован!'
					)}
				</div>
			)}

			<div>
				<button onClick={getUsers}>Получить пользователей</button>
				<ul>
					{users.map(user => (
						<li key={user.id}>
							{user.name || 'Без имени'} Почта: {user.email} Роли:{' '}
							{user.roles.join(', ')} Активация:{' '}
							{user.isActivated ? 'Да' : 'Нет'}'
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default App;
