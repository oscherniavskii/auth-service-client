import { useState, type FC } from 'react';
import useAuthStore from '../store/authStore';

interface AuthFormProps {
	type?: 'login' | 'registration';
}

const AuthForm: FC<AuthFormProps> = ({ type = 'login' }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	const login = useAuthStore(state => state.login);
	const registration = useAuthStore(state => state.registration);

	const clearInputs = () => {
		setEmail('');
		setName('');
		setPassword('');
	};

	return (
		<div className='form'>
			{type === 'registration' && (
				<input
					type='text'
					placeholder='Имя'
					value={name}
					onChange={e => setName(e.target.value)}
				/>
			)}
			<input
				type='email'
				placeholder='Email *'
				value={email}
				onChange={e => setEmail(e.target.value)}
				required
			/>
			<input
				type='password'
				placeholder='Пароль *'
				value={password}
				onChange={e => setPassword(e.target.value)}
				required
			/>
			<p className='form__info'>
				Знаком * обозначены поля обязательные к заполнению
			</p>
			{type === 'registration' ? (
				<button
					onClick={() =>
						registration(email, password, name).then(() => clearInputs())
					}
				>
					Зарегистрироваться
				</button>
			) : (
				<button
					onClick={() => login(email, password).then(() => clearInputs())}
				>
					Войти
				</button>
			)}
		</div>
	);
};

export default AuthForm;
