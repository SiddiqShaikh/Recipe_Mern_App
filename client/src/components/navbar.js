import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import '../App.css';

function Navbar() {
	const [cookies, setCookies] = useCookies(['access-token']);
	const navigate = useNavigate();
	const Logout = () => {
		setCookies('access-token', '');
		window.localStorage.clear();
		navigate('/auth');
	};
	return (
		<div className='navbar'>
			<Link to='/'>Home</Link>

			<Link to='/create-recipe'>Create Recipe</Link>
			<Link to='/auth'>
				{!cookies['access-token'] ? (
					'Login / Register'
				) : (
					<>
						<Link to='/saved-recipe'>Saved Recipe</Link>
						<button onClick={Logout}>Logout</button>
					</>
				)}
			</Link>
		</div>
	);
}

export default Navbar;
