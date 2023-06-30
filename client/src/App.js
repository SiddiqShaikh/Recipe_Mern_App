import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/home-page';
import CreateRecipe from './pages/create-recipe';
import SavedRecipe from './pages/saved-recipe';
import Auth from './pages/auth';
import Navbar from './components/navbar';

function App() {
	return (
		<div className='App'>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/create-recipe' element={<CreateRecipe />} />
					<Route path='/saved-recipe' element={<SavedRecipe />} />
					<Route path='/auth' element={<Auth />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
