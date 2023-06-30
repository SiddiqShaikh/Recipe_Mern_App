import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Auth() {
	return (
		<div className='auth'>
			<Login />
			<Register />
		</div>
	);
}

export default Auth;

const Login = () => {
	const navigate = useNavigate();
	const [_, setCookies] = useCookies(['access-token']);
	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post('http://localhost:3001/auth/login', {
				username,
				password,
			});
			setCookies('access-token', response.data.token);
			window.localStorage.setItem('userID', response.data.userID);
			navigate('/');
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<Form
			username={username}
			setUserName={setUserName}
			password={password}
			setPassword={setPassword}
			label='Login'
			handleSubmit={handleSubmit}
		/>
	);
};
const Register = () => {
	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const handleSubmit = async (event) => {
		console.log('registered click');
		event.preventDefault();
		try {
			await axios.post('http://localhost:3001/auth/register', {
				username,
				password,
			});
			console.log('Successfully registered');
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<Form
			username={username}
			setUserName={setUserName}
			password={password}
			setPassword={setPassword}
			label='Register'
			handleSubmit={handleSubmit}
		/>
	);
};

const Form = ({ username, setUserName, password, setPassword, label, handleSubmit }) => {
	return (
		<div className='auth-container'>
			<form onSubmit={handleSubmit}>
				<h2>{label}</h2>
				<div className='form-group'>
					<label htmlFor='userName'>Username:</label>
					<input
						type='text'
						id='username'
						value={username}
						onChange={(event) => setUserName(event.target.value)}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						id='password'
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
				</div>
				<button type='submit'>{label}</button>
			</form>
		</div>
	);
};
